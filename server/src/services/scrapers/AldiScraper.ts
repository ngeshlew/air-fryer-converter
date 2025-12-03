import { Supermarket, Difficulty } from '@prisma/client';
import { BaseScraper, ScrapedRecipe } from './BaseScraper.js';
import { logger } from '../../utils/logger.js';
import { getRecipeEvaluationCode } from './evaluationCode.js';

export class AldiScraper extends BaseScraper {
  constructor() {
    super(Supermarket.ALDI, 'https://www.aldi.co.uk');
  }

  async scrapeRecipeList(limit: number = 10): Promise<string[]> {
    if (!this.page) {
      throw new Error('Page not initialized');
    }

    const recipeUrls: string[] = [];

    try {
      // Navigate to ALDI Air Fryer recipes collection page
      const recipesUrl = `${this.baseUrl}/recipes/collections/air-fryer`;
      await this.navigateWithRetry(recipesUrl);

      // Wait for recipe cards to load
      await this.page.waitForSelector('a[href*="/recipes/"]', { timeout: 10000 });

      // Extract recipe URLs - only get actual recipe pages, not collection pages
      const urlExtractionCode = `
        (function() {
          const links = Array.from(document.querySelectorAll('a[href*="/recipes/"]'));
          return links
            .map(function(link) { return link.href; })
            .filter(function(href) {
              if (!href) return false;
              const url = href.toLowerCase();
              const excludePatterns = [
                '/recipes/collections/',
                '/recipes/scottish',
                '/recipes/christmas',
                '/recipes/courses',
                '/recipes/',
              ];
              if (url.endsWith('/recipes') || url.endsWith('/recipes/')) return false;
              if (url.includes('/recipes/collections/')) {
                if (url.includes('/recipes/collections/air-fryer/')) {
                  const pathParts = url.split('/recipes/collections/air-fryer/')[1];
                  return pathParts && pathParts.length > 0 && !pathParts.includes('/');
                }
                return false;
              }
              const pathParts = url.split('/recipes/');
              if (pathParts.length > 1) {
                const afterRecipes = pathParts[1];
                return afterRecipes && 
                       afterRecipes.length > 0 && 
                       !excludePatterns.some(function(pattern) { return url.includes(pattern); }) &&
                       !afterRecipes.match(/^(scottish|christmas|courses)/);
              }
              return false;
            });
        })();
      `;
      const urls = await this.page.evaluate(urlExtractionCode);

      // Remove duplicates and limit
      const uniqueUrls = Array.from(new Set(urls)).slice(0, limit);
      recipeUrls.push(...uniqueUrls);

      logger.info(`Found ${recipeUrls.length} recipe URLs from ALDI`);
    } catch (error) {
      logger.error('Error scraping ALDI recipe list:', error);
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
      logger.error(`Error scraping ALDI recipe ${url}:`, error);
      return null;
    }
  }
}

