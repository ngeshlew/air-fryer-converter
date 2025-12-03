import { Supermarket, Difficulty } from '@prisma/client';
import { BaseScraper, ScrapedRecipe } from './BaseScraper.js';
import { logger } from '../../utils/logger.js';
import { getRecipeEvaluationCode } from './evaluationCode.js';

export class TescoScraper extends BaseScraper {
  constructor() {
    super(Supermarket.TESCO, 'https://realfood.tesco.com');
  }

  async scrapeRecipeList(limit: number = 10): Promise<string[]> {
    if (!this.page) {
      throw new Error('Page not initialized');
    }

    const recipeUrls: string[] = [];

    try {
      // Navigate to Tesco Real Food Air Fryer category page
      const recipesUrl = `${this.baseUrl}/category/air-fryer.html`;
      await this.navigateWithRetry(recipesUrl);

      // Wait for recipe cards to load
      await this.page.waitForSelector('a[href*="/recipes/"]', { timeout: 10000 });

      // Extract recipe URLs - filter for actual recipe pages, not category pages
      const urlExtractionCode = `
        (function() {
          const links = Array.from(document.querySelectorAll('a[href*="/recipes/"]'));
          return links
            .map(function(link) { return link.href; })
            .filter(function(href) {
              if (!href) return false;
              const url = href.toLowerCase();
              return url.includes('/recipes/') && 
                     !url.endsWith('/recipes') && 
                     !url.endsWith('/recipes/') &&
                     !url.includes('/recipes/popular/') &&
                     !url.includes('/recipes/collections/') &&
                     !url.includes('/recipes/special-diets/') &&
                     !url.includes('/recipes/courses/');
            });
        })();
      `;
      const urls = await this.page.evaluate(urlExtractionCode);

      // Remove duplicates and limit
      const uniqueUrls = Array.from(new Set(urls)).slice(0, limit);
      recipeUrls.push(...uniqueUrls);

      logger.info(`Found ${recipeUrls.length} recipe URLs from Tesco`);
    } catch (error) {
      logger.error('Error scraping Tesco recipe list:', error);
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

      if (!recipeData.title || recipeData.ingredients.length === 0 || recipeData.instructions.length === 0) {
        logger.warn(`Incomplete recipe data for: ${url}`);
        return null;
      }

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

      recipe.tags = this.extractTags(recipe);

      return recipe;
    } catch (error) {
      logger.error(`Error scraping Tesco recipe ${url}:`, error);
      return null;
    }
  }
}

