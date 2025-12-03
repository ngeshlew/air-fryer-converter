// Scraping routes (admin/internal)

import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../utils/database.js';
import { logger } from '../utils/logger.js';
import { scrapingService } from '../services/scraping.service.js';
import { Supermarket } from '@prisma/client';

const router = Router();

// POST /api/scraping/trigger - Manually trigger scraping
router.post('/trigger', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if scraping is already running
    if (scrapingService.isScrapingRunning()) {
      return res.status(409).json({
        success: false,
        message: 'Scraping is already in progress',
      });
    }

    const schema = z.object({
      supermarket: z.enum([
        'ALDI',
        'WAITROSE',
        'TESCO',
        'MARKS_AND_SPENCER',
        'BBC_GOOD_FOOD',
        'HAPPY_FOODIE',
      ]).optional(),
      limit: z.number().min(1).max(50).optional(),
    });

    const { supermarket, limit = 10 } = schema.parse(req.body);

    logger.info(`Scraping triggered${supermarket ? ` for ${supermarket}` : ' for all supermarkets'}`);

    // Run scraping in background
    if (supermarket) {
      // Scrape specific supermarket
      scrapingService.scrapeSupermarket(supermarket as Supermarket, limit)
        .then((result) => {
          logger.info(`Scraping completed for ${supermarket}:`, result);
        })
        .catch((error) => {
          logger.error(`Scraping failed for ${supermarket}:`, error);
        });
    } else {
      // Scrape all supermarkets
      scrapingService.scrapeAll(limit)
        .then((result) => {
          logger.info('Scraping completed for all supermarkets:', result);
        })
        .catch((error) => {
          logger.error('Scraping failed:', error);
        });
    }

    res.json({
      success: true,
      message: `Scraping started${supermarket ? ` for ${supermarket}` : ' for all supermarkets'}`,
    });
  } catch (error) {
    logger.error('Error triggering scraping:', error);
    next(error);
  }
});

// GET /api/scraping/logs - Get scraping logs
router.get('/logs', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit = '50' } = req.query;

    const logs = await prisma.scrapingLog.findMany({
      take: parseInt(limit as string, 10),
      orderBy: {
        startedAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    logger.error('Error fetching scraping logs:', error);
    next(error);
  }
});

// GET /api/scraping/status - Get scraping status
router.get('/status', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await scrapingService.getStats();
    const isRunning = scrapingService.isScrapingRunning();

    res.json({
      success: true,
      data: {
        isRunning,
        ...stats,
      },
    });
  } catch (error) {
    logger.error('Error fetching scraping status:', error);
    next(error);
  }
});

export default router;

