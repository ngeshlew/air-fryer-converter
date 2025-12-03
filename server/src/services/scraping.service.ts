import { Supermarket, ScrapingStatus } from '@prisma/client';
import prisma from '../utils/database.js';
import { logger } from '../utils/logger.js';
import { AldiScraper } from './scrapers/AldiScraper.js';
import { WaitroseScraper } from './scrapers/WaitroseScraper.js';
import { TescoScraper } from './scrapers/TescoScraper.js';
import { MarksAndSpencerScraper } from './scrapers/MarksAndSpencerScraper.js';
import { BBCGoodFoodScraper } from './scrapers/BBCGoodFoodScraper.js';
import { BaseScraper, ScrapedRecipe } from './scrapers/BaseScraper.js';

export class ScrapingService {
  private scrapers: Map<Supermarket, BaseScraper>;
  private isRunning: boolean = false;
  private rateLimitDelay: number = 3000; // 3 seconds between scrapers

  constructor() {
    this.scrapers = new Map([
      [Supermarket.ALDI, new AldiScraper()],
      [Supermarket.WAITROSE, new WaitroseScraper()],
      [Supermarket.TESCO, new TescoScraper()],
      [Supermarket.MARKS_AND_SPENCER, new MarksAndSpencerScraper()],
      [Supermarket.BBC_GOOD_FOOD, new BBCGoodFoodScraper()],
    ]);
  }

  /**
   * Check if scraping is currently running
   */
  isScrapingRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Scrape recipes from a specific supermarket
   */
  async scrapeSupermarket(
    supermarket: Supermarket,
    limit: number = 10
  ): Promise<{ success: number; failed: number; total: number }> {
    const scraper = this.scrapers.get(supermarket);
    
    if (!scraper) {
      throw new Error(`No scraper available for ${supermarket}`);
    }

    logger.info(`Starting scrape for ${supermarket}`);

    // Create scraping log
    const log = await prisma.scrapingLog.create({
      data: {
        supermarket,
        status: ScrapingStatus.IN_PROGRESS,
        recipesFound: 0,
        recipesAdded: 0,
        recipesUpdated: 0,
      },
    });

    let successCount = 0;
    let failedCount = 0;
    let addedCount = 0;
    let updatedCount = 0;

    try {
      // Scrape recipes
      const recipes = await scraper.scrape(limit);
      
      // Save recipes to database
      for (const recipe of recipes) {
        try {
          const result = await this.saveRecipe(recipe);
          successCount++;
          if (result === 'added') {
            addedCount++;
          } else if (result === 'updated') {
            updatedCount++;
          }
        } catch (error) {
          logger.error(`Failed to save recipe ${recipe.title}:`, error);
          failedCount++;
        }
      }

      // Update log with success
      await prisma.scrapingLog.update({
        where: { id: log.id },
        data: {
          status: ScrapingStatus.COMPLETED,
          recipesFound: recipes.length,
          recipesAdded: addedCount,
          recipesUpdated: updatedCount,
          completedAt: new Date(),
        },
      });

      logger.info(
        `Completed scraping ${supermarket}: ${successCount} success, ${failedCount} failed`
      );

      return {
        success: successCount,
        failed: failedCount,
        total: recipes.length,
      };
    } catch (error) {
      // Update log with failure
      await prisma.scrapingLog.update({
        where: { id: log.id },
        data: {
          status: ScrapingStatus.FAILED,
          errorMessage: error instanceof Error ? error.message : 'Unknown error',
          completedAt: new Date(),
        },
      });

      logger.error(`Scraping failed for ${supermarket}:`, error);
      throw error;
    }
  }

  /**
   * Scrape all supermarkets
   */
  async scrapeAll(limitPerSupermarket: number = 10): Promise<{
    results: Array<{
      supermarket: Supermarket;
      success: number;
      failed: number;
      total: number;
    }>;
    totalSuccess: number;
    totalFailed: number;
  }> {
    if (this.isRunning) {
      throw new Error('Scraping is already in progress');
    }

    this.isRunning = true;
    const results: Array<{
      supermarket: Supermarket;
      success: number;
      failed: number;
      total: number;
    }> = [];

    let totalSuccess = 0;
    let totalFailed = 0;

    try {
      logger.info('Starting scrape for all supermarkets');

      for (const [supermarket, _] of this.scrapers) {
        try {
          const result = await this.scrapeSupermarket(supermarket, limitPerSupermarket);
          
          results.push({
            supermarket,
            ...result,
          });

          totalSuccess += result.success;
          totalFailed += result.failed;

          // Rate limiting: wait between supermarkets
          await this.delay(this.rateLimitDelay);
        } catch (error) {
          logger.error(`Failed to scrape ${supermarket}:`, error);
          results.push({
            supermarket,
            success: 0,
            failed: 0,
            total: 0,
          });
        }
      }

      logger.info(
        `Completed scraping all supermarkets: ${totalSuccess} success, ${totalFailed} failed`
      );

      return {
        results,
        totalSuccess,
        totalFailed,
      };
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Save scraped recipe to database
   * Returns 'added' if new recipe, 'updated' if existing recipe
   */
  private async saveRecipe(recipe: ScrapedRecipe): Promise<'added' | 'updated'> {
    try {
      // Check if recipe already exists by URL
      const existing = await prisma.recipe.findFirst({
        where: { sourceUrl: recipe.sourceUrl },
      });

      if (existing) {
        // Update existing recipe
        await prisma.recipe.update({
          where: { id: existing.id },
          data: {
            title: recipe.title,
            description: recipe.description,
            imageUrl: recipe.imageUrl,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            servings: recipe.servings,
            difficulty: recipe.difficulty,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            tags: recipe.tags,
          },
        });

        logger.info(`Updated existing recipe: ${recipe.title}`);
        return 'updated';
      } else {
        // Create new recipe
        await prisma.recipe.create({
          data: recipe,
        });

        logger.info(`Created new recipe: ${recipe.title}`);
        return 'added';
      }
    } catch (error) {
      logger.error(`Error saving recipe ${recipe.title}:`, error);
      throw error;
    }
  }

  /**
   * Get scraping logs
   */
  async getLogs(limit: number = 50) {
    return await prisma.scrapingLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  /**
   * Get scraping statistics
   */
  async getStats() {
    const logs = await prisma.scrapingLog.findMany({
      where: {
        status: ScrapingStatus.COMPLETED,
      },
    });

    const totalRecipes = logs.reduce((sum, log) => sum + log.recipesScraped, 0);
    const totalFailed = logs.reduce((sum, log) => sum + log.recipesFailed, 0);
    const totalRuns = logs.length;

    const bySupermarket = await prisma.scrapingLog.groupBy({
      by: ['supermarket'],
      where: {
        status: ScrapingStatus.COMPLETED,
      },
      _sum: {
        recipesScraped: true,
        recipesFailed: true,
      },
      _count: true,
    });

    return {
      totalRecipes,
      totalFailed,
      totalRuns,
      bySupermarket,
      lastRun: logs[0]?.completedAt || null,
    };
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const scrapingService = new ScrapingService();

