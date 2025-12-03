// Script to scrape recipes from a single supermarket
// Usage: tsx src/scripts/scrapeSingle.ts ALDI

import { scrapingService } from '../services/scraping.service.js';
import { Supermarket } from '@prisma/client';
import { logger } from '../utils/logger.js';

const supermarketArg = process.argv[2] as Supermarket;

if (!supermarketArg) {
  logger.error('Please provide a supermarket name: ALDI, WAITROSE, TESCO, MARKS_AND_SPENCER, BBC_GOOD_FOOD');
  process.exit(1);
}

if (!Object.values(Supermarket).includes(supermarketArg)) {
  logger.error(`Invalid supermarket: ${supermarketArg}`);
  logger.error('Valid options: ALDI, WAITROSE, TESCO, MARKS_AND_SPENCER, BBC_GOOD_FOOD');
  process.exit(1);
}

async function scrape() {
  logger.info(`🚀 Starting scraping for ${supermarketArg}...`);
  
  try {
    const result = await scrapingService.scrapeSupermarket(supermarketArg, 20);
    
    logger.info(`\n✅ Scraping completed for ${supermarketArg}:`);
    logger.info(`   Success: ${result.success}`);
    logger.info(`   Failed: ${result.failed}`);
    logger.info(`   Total: ${result.total}`);
    
    process.exit(0);
  } catch (error) {
    logger.error(`\n❌ Scraping failed for ${supermarketArg}:`, error);
    process.exit(1);
  }
}

scrape();

