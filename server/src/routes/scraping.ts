// Scraping routes (admin/internal)

import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../utils/database.js';
import { logger } from '../utils/logger.js';

const router = Router();

// POST /api/scraping/trigger - Manually trigger scraping
router.post('/trigger', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = z.object({
      supermarket: z.enum([
        'ALDI',
        'WAITROSE',
        'MARKS_AND_SPENCER',
        'TESCO',
        'BBC_GOOD_FOOD',
        'HAPPY_FOODIE',
      ]),
    });

    const { supermarket } = schema.parse(req.body);

    // TODO: Implement actual scraping service
    logger.info(`Scraping triggered for: ${supermarket}`);

    res.json({
      success: true,
      message: `Scraping started for ${supermarket}`,
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
    const latestLog = await prisma.scrapingLog.findFirst({
      orderBy: {
        startedAt: 'desc',
      },
    });

    if (!latestLog) {
      return res.json({
        success: true,
        data: {
          status: 'No scraping runs yet',
          lastRun: null,
        },
      });
    }

    res.json({
      success: true,
      data: {
        status: latestLog.status,
        lastRun: latestLog.startedAt,
        completedAt: latestLog.completedAt,
        recipesAdded: latestLog.recipesAdded,
        recipesUpdated: latestLog.recipesUpdated,
      },
    });
  } catch (error) {
    logger.error('Error fetching scraping status:', error);
    next(error);
  }
});

export default router;

