import { Supermarket, Difficulty } from '@prisma/client';
import { BaseScraper, ScrapedRecipe } from './BaseScraper.js';
import { logger } from '../../utils/logger.js';

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
      // Navigate to ALDI recipes page
      const recipesUrl = `${this.baseUrl}/recipes`;
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

      // Extract recipe data
      const recipeData = await this.page.evaluate(() => {
        // Helper function to get text content
        const getText = (selector: string): string | null => {
          const element = document.querySelector(selector);
          return element?.textContent?.trim() || null;
        };

        // Helper function to get all text contents
        const getAllText = (selector: string): string[] => {
          const elements = Array.from(document.querySelectorAll(selector));
          return elements
            .map(el => el.textContent?.trim())
            .filter((text): text is string => Boolean(text));
        };

        // Get title
        const title = getText('h1') || getText('[class*="title"]') || getText('[class*="Title"]');

        // Get description
        const description = getText('[class*="description"]') || getText('[class*="Description"]') || getText('p');

        // Get image
        const imageElement = document.querySelector('img[src*="recipe"]') || document.querySelector('img[alt*="recipe"]') || document.querySelector('main img');
        const imageUrl = imageElement ? (imageElement as HTMLImageElement).src : null;

        // Get prep time
        const prepTimeText = getText('[class*="prep"]') || getText('[class*="Prep"]');

        // Get cook time
        const cookTimeText = getText('[class*="cook"]') || getText('[class*="Cook"]');

        // Get servings
        const servingsText = getText('[class*="serving"]') || getText('[class*="Serving"]') || getText('[class*="serves"]');

        // Get difficulty
        const difficultyText = getText('[class*="difficulty"]') || getText('[class*="Difficulty"]');

        // Get ingredients
        const ingredients = getAllText('[class*="ingredient"] li') || 
                          getAllText('[class*="Ingredient"] li') ||
                          getAllText('ul li').filter(text => 
                            text.match(/\d+/) && (text.includes('g') || text.includes('ml') || text.includes('tbsp') || text.includes('tsp'))
                          );

        // Get instructions
        const instructions = getAllText('[class*="instruction"] li') || 
                           getAllText('[class*="Instruction"] li') ||
                           getAllText('[class*="method"] li') ||
                           getAllText('[class*="Method"] li') ||
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

