// Script to scrape recipes from all supermarkets
// Run with: tsx src/scripts/scrapeAllRecipes.ts

import { scrapingService } from '../services/scraping.service.js';
import { Supermarket } from '@prisma/client';
import { logger } from '../utils/logger.js';

async function scrapeAll() {
  logger.info('🚀 Starting comprehensive recipe scraping...');
  
  const results: Array<{
    supermarket: Supermarket;
    success: number;
    failed: number;
    total: number;
  }> = [];

  const supermarkets = [
    Supermarket.ALDI,
    Supermarket.WAITROSE,
    Supermarket.TESCO,
    Supermarket.MARKS_AND_SPENCER,
    Supermarket.BBC_GOOD_FOOD,
  ];

  for (const supermarket of supermarkets) {
    try {
      logger.info(`\n📦 Scraping ${supermarket}...`);
      
      const result = await scrapingService.scrapeSupermarket(supermarket, 20); // Scrape 20 recipes per supermarket
      
      results.push({
        supermarket,
        ...result,
      });

      logger.info(`✅ ${supermarket}: ${result.success} success, ${result.failed} failed`);
      
      // Wait between supermarkets
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (error) {
      logger.error(`❌ Failed to scrape ${supermarket}:`, error);
      results.push({
        supermarket,
        success: 0,
        failed: 0,
        total: 0,
      });
    }
  }

  // Summary
  logger.info('\n📊 Scraping Summary:');
  logger.info('='.repeat(50));
  
  let totalSuccess = 0;
  let totalFailed = 0;
  
  results.forEach(result => {
    logger.info(`${result.supermarket}:`);
    logger.info(`  ✅ Success: ${result.success}`);
    logger.info(`  ❌ Failed: ${result.failed}`);
    logger.info(`  📝 Total: ${result.total}`);
    totalSuccess += result.success;
    totalFailed += result.failed;
  });
  
  logger.info('='.repeat(50));
  logger.info(`🎉 Total Recipes Scraped: ${totalSuccess}`);
  logger.info(`⚠️  Total Failed: ${totalFailed}`);
  logger.info(`📦 Total Supermarkets: ${results.length}`);
}

scrapeAll()
  .then(() => {
    logger.info('\n✅ Scraping completed!');
    process.exit(0);
  })
  .catch((error) => {
    logger.error('\n❌ Scraping failed:', error);
    process.exit(1);
  });

