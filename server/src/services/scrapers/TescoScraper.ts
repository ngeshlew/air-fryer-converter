import { Supermarket, Difficulty } from '@prisma/client';
import { BaseScraper, ScrapedRecipe } from './BaseScraper.js';
import { logger } from '../../utils/logger.js';

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

      // Extract recipe URLs
      const urls = await this.page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="/recipes/"]'));
        return links
          .map(link => (link as HTMLAnchorElement).href)
          .filter(href => href && !href.endsWith('/recipes') && !href.endsWith('/recipes/'));
      });

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

      // Extract recipe data
      const recipeData = await this.page.evaluate(() => {
        const getText = (selector: string): string | null => {
          const element = document.querySelector(selector);
          return element?.textContent?.trim() || null;
        };

        const getAllText = (selector: string): string[] => {
          const elements = Array.from(document.querySelectorAll(selector));
          return elements
            .map(el => el.textContent?.trim())
            .filter((text): text is string => Boolean(text));
        };

        const title = getText('h1') || getText('[class*="recipe-title"]');
        const description = getText('[class*="description"]') || getText('[class*="intro"]') || getText('p');
        
        const imageElement = document.querySelector('img[src*="recipe"]') || document.querySelector('[class*="recipe"] img') || document.querySelector('main img');
        const imageUrl = imageElement ? (imageElement as HTMLImageElement).src : null;

        const prepTimeText = getText('[class*="prep"]') || getText('[data-test*="prep"]');
        const cookTimeText = getText('[class*="cook"]') || getText('[data-test*="cook"]');
        const servingsText = getText('[class*="serving"]') || getText('[data-test*="serves"]');
        const difficultyText = getText('[class*="difficulty"]') || getText('[data-test*="difficulty"]');

        const ingredients = getAllText('[class*="ingredient"] li') || 
                          getAllText('[data-test*="ingredient"] li') ||
                          getAllText('ul li').slice(0, 20); // Limit to first 20 list items
        
        const instructions = getAllText('[class*="instruction"] li') || 
                           getAllText('[class*="method"] li') ||
                           getAllText('[data-test*="method"] li') ||
                           getAllText('ol li');

        return {
          title,
          description,
          imageUrl,
          prepTimeText,
          cookTimeText,
          servingsText,
          difficultyText,
          ingredients,
          instructions,
        };
      });

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

