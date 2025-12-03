import { Supermarket, Difficulty } from '@prisma/client';
import { BaseScraper, ScrapedRecipe } from './BaseScraper.js';
import { logger } from '../../utils/logger.js';
import { getRecipeEvaluationCode } from './evaluationCode.js';

export class WaitroseScraper extends BaseScraper {
  constructor() {
    super(Supermarket.WAITROSE, 'https://www.waitrose.com');
  }

  async scrapeRecipeList(limit: number = 10): Promise<string[]> {
    if (!this.page) {
      throw new Error('Page not initialized');
    }

    const recipeUrls: string[] = [];

    try {
      // Navigate to Waitrose Air Fryer recipes page
      const recipesUrl = `${this.baseUrl}/ecom/recipes/air-fryer`;
      await this.navigateWithRetry(recipesUrl);

      // Wait for recipe cards to load
      await this.page.waitForSelector('a[href*="/recipes/"]', { timeout: 10000 });

      // Extract recipe URLs
      const urlExtractionCode = `
        (function() {
          const links = Array.from(document.querySelectorAll('a[href*="/recipes/"]'));
          return links
            .map(function(link) { return link.href; })
            .filter(function(href) {
              return href && !href.endsWith('/recipes') && !href.endsWith('/recipes/') && 
                     href.includes('/recipes/') && !href.includes('/recipes/all-recipes') &&
                     !href.includes('/recipes/all-categories') && !href.includes('/recipes/christmas') &&
                     !href.includes('/recipes/new') && !href.includes('/recipes/quick-easy') &&
                     !href.includes('/recipes/meal-maths') && !href.includes('/recipes/baking') &&
                     !href.includes('/recipes/meals-dishes/');
            });
        })();
      `;
      const urls = await this.page.evaluate(urlExtractionCode);

      // Remove duplicates and limit
      const uniqueUrls = Array.from(new Set(urls)).slice(0, limit);
      recipeUrls.push(...uniqueUrls);

      logger.info(`Found ${recipeUrls.length} recipe URLs from Waitrose`);
    } catch (error) {
      logger.error('Error scraping Waitrose recipe list:', error);
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
      logger.error(`Error scraping Waitrose recipe ${url}:`, error);
      return null;
    }
  }
}

