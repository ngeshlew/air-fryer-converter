import { Supermarket, Difficulty } from '@prisma/client';
import { BaseScraper, ScrapedRecipe } from './BaseScraper.js';
import { logger } from '../../utils/logger.js';

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

      // Extract recipe URLs
      const urls = await this.page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="/food/recipes/"]'));
        return links
          .map(link => (link as HTMLAnchorElement).href)
          .filter(href => {
            const url = href.toLowerCase();
            return url && 
                   url.includes('/food/recipes/') && 
                   !url.endsWith('/food/recipes') && 
                   !url.endsWith('/food/recipes/') &&
                   !url.includes('/collections/');
          });
      });

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
            .filter(text => text !== null && text !== undefined && text !== '') as string[];
        };

        // Get title
        const title = getText('h1') || getText('[class*="recipe-header"] h1') || getText('[class*="title"]');

        // Get description
        const description = getText('[class*="recipe-description"]') || 
                          getText('[class*="description"]') || 
                          getText('[class*="intro"]') ||
                          getText('p');

        // Get image - try multiple selectors for BBC Food recipe pages
        const imageSelectors = [
          'img[src*="recipe"]',
          'img[alt*="recipe"]',
          '[class*="recipe-header"] img',
          '[class*="hero"] img',
          '[class*="Hero"] img',
          '[class*="recipe-image"] img',
          '[class*="RecipeImage"] img',
          'picture img',
          'article img[src*="."]',
          'main img[src*="."]',
          'main img'
        ];
        
        let imageUrl: string | null = null;
        for (const selector of imageSelectors) {
          const img = document.querySelector(selector) as HTMLImageElement;
          if (img && img.src) {
            if (!img.src.startsWith('data:') && img.naturalWidth > 200) {
              imageUrl = img.src;
              break;
            }
          }
        }
        
        // Ensure full URL if relative
        if (imageUrl && imageUrl.startsWith('/')) {
          imageUrl = `https://www.bbc.co.uk${imageUrl}`;
        }
        
        // Remove query parameters
        if (imageUrl && imageUrl.includes('?')) {
          const urlParts = imageUrl.split('?');
          imageUrl = urlParts[0];
        }

        // Get prep time
        const prepTimeText = getText('[class*="prep"]') || 
                           getText('[class*="Prep"]') ||
                           getText('[data-test*="prep"]') ||
                           getText('[aria-label*="prep"]');

        // Get cook time
        const cookTimeText = getText('[class*="cook"]') || 
                           getText('[class*="Cook"]') ||
                           getText('[data-test*="cook"]') ||
                           getText('[aria-label*="cook"]');

        // Get servings
        const servingsText = getText('[class*="serving"]') || 
                           getText('[class*="Serving"]') || 
                           getText('[class*="serves"]') ||
                           getText('[data-test*="serves"]');

        // Get difficulty
        const difficultyText = getText('[class*="difficulty"]') || 
                             getText('[class*="Difficulty"]') ||
                             getText('[data-test*="difficulty"]');

        // Get ingredients
        const ingredientsHeader = Array.from(document.querySelectorAll('h2, h3')).find(el => 
          el.textContent?.toLowerCase().includes('ingredient')
        );
        const ingredients = ingredientsHeader?.nextElementSibling?.querySelectorAll('li') ?
                          Array.from(ingredientsHeader.nextElementSibling.querySelectorAll('li')).map(li => li.textContent?.trim()).filter(Boolean) as string[] :
                          getAllText('[class*="ingredient"] li') || 
                          getAllText('[class*="Ingredient"] li') ||
                          getAllText('ul li').filter(text => 
                            text.match(/\d+/) && (text.includes('g') || text.includes('ml') || text.includes('tbsp') || text.includes('tsp'))
                          );

        // Get instructions
        const methodHeader = Array.from(document.querySelectorAll('h2, h3')).find(el => 
          el.textContent?.toLowerCase().includes('method') || 
          el.textContent?.toLowerCase().includes('instruction')
        );
        const instructions = methodHeader?.nextElementSibling?.querySelectorAll('ol li, li') ?
                          Array.from(methodHeader.nextElementSibling.querySelectorAll('ol li, li')).map(li => li.textContent?.trim()).filter(Boolean) as string[] :
                          getAllText('[class*="instruction"] li') || 
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
      logger.error(`Error scraping BBC Good Food recipe ${url}:`, error);
      return null;
    }
  }
}

