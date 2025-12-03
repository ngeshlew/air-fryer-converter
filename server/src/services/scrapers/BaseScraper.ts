import puppeteer, { Browser, Page } from 'puppeteer';
import { Supermarket, Difficulty } from '@prisma/client';
import { logger } from '../../utils/logger.js';

export interface ScrapedRecipe {
  title: string;
  description: string | null;
  supermarket: Supermarket;
  sourceUrl: string;
  imageUrl: string | null;
  prepTime: number | null;
  cookTime: number | null;
  servings: number | null;
  difficulty: Difficulty | null;
  ingredients: string[];
  instructions: string[];
  tags: string[];
}

export abstract class BaseScraper {
  protected browser: Browser | null = null;
  protected page: Page | null = null;
  protected supermarket: Supermarket;
  protected baseUrl: string;

  constructor(supermarket: Supermarket, baseUrl: string) {
    this.supermarket = supermarket;
    this.baseUrl = baseUrl;
  }

  /**
   * Initialize browser and page
   */
  protected async init(): Promise<void> {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu',
        ],
      });
      this.page = await this.browser.newPage();
      
      // Set user agent to avoid bot detection
      await this.page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      );

      logger.info(`Initialized scraper for ${this.supermarket}`);
    } catch (error) {
      logger.error(`Failed to initialize scraper for ${this.supermarket}:`, error);
      throw error;
    }
  }

  /**
   * Close browser
   */
  protected async cleanup(): Promise<void> {
    try {
      if (this.page) {
        await this.page.close();
      }
      if (this.browser) {
        await this.browser.close();
      }
      logger.info(`Cleaned up scraper for ${this.supermarket}`);
    } catch (error) {
      logger.error(`Error during cleanup for ${this.supermarket}:`, error);
    }
  }

  /**
   * Navigate to a URL with retry logic
   */
  protected async navigateWithRetry(
    url: string,
    maxRetries: number = 3
  ): Promise<void> {
    if (!this.page) {
      throw new Error('Page not initialized');
    }

    let lastError: Error | null = null;

    for (let i = 0; i < maxRetries; i++) {
      try {
        await this.page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 30000,
        });
        return;
      } catch (error) {
        lastError = error as Error;
        logger.warn(
          `Navigation attempt ${i + 1}/${maxRetries} failed for ${url}:`,
          error
        );
        
        if (i < maxRetries - 1) {
          // Wait before retrying
          await this.delay(2000 * (i + 1));
        }
      }
    }

    throw new Error(
      `Failed to navigate to ${url} after ${maxRetries} attempts: ${lastError?.message}`
    );
  }

  /**
   * Delay helper
   */
  protected delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Parse time string to minutes
   * Examples: "30 mins", "1 hour 30 mins", "1h 30m"
   */
  protected parseTimeToMinutes(timeStr: string): number | null {
    if (!timeStr) return null;

    const cleaned = timeStr.toLowerCase().trim();
    let totalMinutes = 0;

    // Match hours
    const hoursMatch = cleaned.match(/(\d+)\s*(hour|hr|h)/);
    if (hoursMatch) {
      totalMinutes += parseInt(hoursMatch[1]) * 60;
    }

    // Match minutes
    const minutesMatch = cleaned.match(/(\d+)\s*(minute|min|m)/);
    if (minutesMatch) {
      totalMinutes += parseInt(minutesMatch[1]);
    }

    // If no match, try to parse as plain number
    if (totalMinutes === 0) {
      const numberMatch = cleaned.match(/(\d+)/);
      if (numberMatch) {
        totalMinutes = parseInt(numberMatch[1]);
      }
    }

    return totalMinutes > 0 ? totalMinutes : null;
  }

  /**
   * Parse servings from string
   * Examples: "Serves 4", "4 servings", "4-6 people"
   */
  protected parseServings(servingsStr: string): number | null {
    if (!servingsStr) return null;

    const cleaned = servingsStr.toLowerCase().trim();
    
    // Try to find first number
    const match = cleaned.match(/(\d+)/);
    if (match) {
      return parseInt(match[1]);
    }

    return null;
  }

  /**
   * Parse difficulty from string
   */
  protected parseDifficulty(difficultyStr: string): Difficulty | null {
    if (!difficultyStr) return null;

    const cleaned = difficultyStr.toLowerCase().trim();

    if (cleaned.includes('easy')) return Difficulty.EASY;
    if (cleaned.includes('medium') || cleaned.includes('moderate')) return Difficulty.MEDIUM;
    if (cleaned.includes('hard') || cleaned.includes('difficult') || cleaned.includes('advanced')) return Difficulty.HARD;

    return null;
  }

  /**
   * Clean and normalize text
   */
  protected cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim();
  }

  /**
   * Extract tags from recipe content
   */
  protected extractTags(recipe: Partial<ScrapedRecipe>): string[] {
    const tags: Set<string> = new Set();

    // Add difficulty as tag
    if (recipe.difficulty) {
      tags.add(recipe.difficulty.toLowerCase());
    }

    // Extract from title
    const titleWords = recipe.title?.toLowerCase().split(' ') || [];
    const commonFoodWords = [
      'chicken', 'beef', 'pork', 'lamb', 'fish', 'salmon', 'cod',
      'vegetarian', 'vegan', 'pasta', 'rice', 'curry', 'soup',
      'salad', 'dessert', 'cake', 'pie', 'tart', 'bread'
    ];

    titleWords.forEach(word => {
      if (commonFoodWords.includes(word)) {
        tags.add(word);
      }
    });

    // Add time-based tags
    if (recipe.cookTime && recipe.cookTime <= 20) {
      tags.add('quick');
    }

    return Array.from(tags);
  }

  /**
   * Abstract method to scrape recipe list URLs
   */
  abstract scrapeRecipeList(limit?: number): Promise<string[]>;

  /**
   * Abstract method to scrape individual recipe
   */
  abstract scrapeRecipe(url: string): Promise<ScrapedRecipe | null>;

  /**
   * Main scraping method
   */
  async scrape(limit: number = 10): Promise<ScrapedRecipe[]> {
    const recipes: ScrapedRecipe[] = [];

    try {
      await this.init();

      logger.info(`Starting scrape for ${this.supermarket}, limit: ${limit}`);

      // Get recipe URLs
      const recipeUrls = await this.scrapeRecipeList(limit);
      logger.info(`Found ${recipeUrls.length} recipe URLs for ${this.supermarket}`);

      // Scrape each recipe
      for (const url of recipeUrls) {
        try {
          logger.info(`Scraping recipe: ${url}`);
          
          const recipe = await this.scrapeRecipe(url);
          
          if (recipe) {
            recipes.push(recipe);
            logger.info(`Successfully scraped: ${recipe.title}`);
          }

          // Delay between requests to be polite
          await this.delay(2000);
        } catch (error) {
          logger.error(`Failed to scrape recipe ${url}:`, error);
          // Continue with next recipe
        }
      }

      logger.info(`Completed scraping ${recipes.length} recipes for ${this.supermarket}`);
    } catch (error) {
      logger.error(`Scraping failed for ${this.supermarket}:`, error);
      throw error;
    } finally {
      await this.cleanup();
    }

    return recipes;
  }
}

