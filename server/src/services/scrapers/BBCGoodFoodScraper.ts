import { Supermarket, Difficulty } from '@prisma/client';
import { BaseScraper, ScrapedRecipe } from './BaseScraper.js';
import { logger } from '../../utils/logger.js';
import { getRecipeEvaluationCode } from './evaluationCode.js';

export class BBCGoodFoodScraper extends BaseScraper {
  constructor() {
    super(Supermarket.BBC_GOOD_FOOD, 'https://www.bbc.co.uk');
  }

  async scrapeRecipeList(limit: number = 10): Promise<string[]> {
    if (!this.page) {
      throw new Error('Page not initialized');
    }

    const recipeUrls: string[] = [];

    try {
      // Navigate to BBC Food Air Fryer recipes collection
      const recipesUrl = `${this.baseUrl}/food/collections/air_fryer_recipes`;
      await this.navigateWithRetry(recipesUrl);

      // Wait for recipe cards to load
      await this.page.waitForSelector('a[href*="/food/recipes/"]', { timeout: 15000 });

      // Extract recipe URLs - filter for actual recipe pages
      const urlExtractionCode = `
        (function() {
          const links = Array.from(document.querySelectorAll('a[href*="/food/recipes/"]'));
          return links
            .map(function(link) { return link.href; })
            .filter(function(href) {
              if (!href) return false;
              const url = href.toLowerCase();
              return url.includes('/food/recipes/') && 
                     !url.endsWith('/food/recipes') && 
                     !url.endsWith('/food/recipes/') &&
                     !url.includes('/collections/');
            });
        })();
      `;
      const urls = await this.page.evaluate(urlExtractionCode);

      // Remove duplicates and limit
      const uniqueUrls = Array.from(new Set(urls)).slice(0, limit);
      recipeUrls.push(...uniqueUrls);

      logger.info(`Found ${recipeUrls.length} recipe URLs from BBC Good Food`);
    } catch (error) {
      logger.error('Error scraping BBC Good Food recipe list:', error);
      throw error;
    }

    return recipeUrls;
  }

  async scrapeRecipe(url: string): Promise<ScrapedRecipe | null> {
    if (!this.page) {
      throw new Error('Page not initialized');
    }

    try {
      await this.navigateWithRetry(url);

      // Extract recipe data - use function string to avoid TypeScript compilation issues
      const evaluationCode = getRecipeEvaluationCode(this.baseUrl);
      const recipeData = await this.page.evaluate(evaluationCode);

      // Validate required fields
      if (!recipeData.title) {
        logger.warn(`No title found for recipe: ${url}`);
        return null;
      }

      if (recipeData.ingredients.length === 0 || recipeData.instructions.length === 0) {
        logger.warn(`Incomplete recipe data for: ${url}`);
        return null;
      }

      // Parse and construct recipe
      const recipe: ScrapedRecipe = {
        title: this.cleanText(recipeData.title),
        description: recipeData.description ? this.cleanText(recipeData.description) : null,
        supermarket: this.supermarket,
        sourceUrl: url,
        imageUrl: recipeData.imageUrl,
        prepTime: recipeData.prepTimeText ? this.parseTimeToMinutes(recipeData.prepTimeText) : null,
        cookTime: recipeData.cookTimeText ? this.parseTimeToMinutes(recipeData.cookTimeText) : null,
        servings: recipeData.servingsText ? this.parseServings(recipeData.servingsText) : null,
        difficulty: recipeData.difficultyText ? this.parseDifficulty(recipeData.difficultyText) : Difficulty.MEDIUM,
        ingredients: recipeData.ingredients.map(ing => this.cleanText(ing)),
        instructions: recipeData.instructions.map(inst => this.cleanText(inst)),
        tags: [],
      };

      // Extract tags
      recipe.tags = this.extractTags(recipe);

      return recipe;
    } catch (error) {
      logger.error(`Error scraping BBC Good Food recipe ${url}:`, error);
      return null;
    }
  }
}

