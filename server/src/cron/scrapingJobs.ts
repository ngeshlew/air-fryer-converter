import cron from 'node-cron';
import { scrapingService } from '../services/scraping.service.js';
import { logger } from '../utils/logger.js';

/**
 * Schedule scraping jobs
 */
export function setupScrapingJobs() {
  // Run scraping every day at 2 AM
  cron.schedule('0 2 * * *', async () => {
    logger.info('Starting scheduled scraping job');
    
    try {
      const result = await scrapingService.scrapeAll(15); // Scrape 15 recipes per supermarket
      
      logger.info('Scheduled scraping completed:', {
        totalSuccess: result.totalSuccess,
        totalFailed: result.totalFailed,
        results: result.results,
      });
    } catch (error) {
      logger.error('Scheduled scraping failed:', error);
    }
  });

  logger.info('Scraping cron jobs scheduled');
  logger.info('- Daily scraping: 2:00 AM (scrapes all supermarkets)');
}

/**
 * Run scraping immediately (for testing)
 */
export async function runScrapingNow() {
  logger.info('Running scraping immediately');
  
  try {
    const result = await scrapingService.scrapeAll(5); // Scrape 5 recipes per supermarket for testing
    
    logger.info('Manual scraping completed:', {
      totalSuccess: result.totalSuccess,
      totalFailed: result.totalFailed,
      results: result.results,
    });
    
    return result;
  } catch (error) {
    logger.error('Manual scraping failed:', error);
    throw error;
  }
}

