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
      // Navigate to ALDI Air Fryer recipes collection page
      const recipesUrl = `${this.baseUrl}/recipes/collections/air-fryer`;
      await this.navigateWithRetry(recipesUrl);

      // Wait for recipe cards to load
      await this.page.waitForSelector('a[href*="/recipes/"]', { timeout: 10000 });

      // Extract recipe URLs - only get actual recipe pages, not collection pages
      const urls = await this.page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="/recipes/"]'));
        return links
          .map(link => (link as HTMLAnchorElement).href)
          .filter(href => {
            if (!href) return false;
            const url = href.toLowerCase();
            // Exclude collection/category pages - these are directories, not individual recipes
            const excludePatterns = [
              '/recipes/collections/',
              '/recipes/scottish',
              '/recipes/christmas',
              '/recipes/courses',
              '/recipes/',
            ];
            // Exclude if it ends with just /recipes or /recipes/collections/...
            if (url.endsWith('/recipes') || url.endsWith('/recipes/')) return false;
            if (url.includes('/recipes/collections/')) return false;
            
            // Include URLs that have a recipe name after /recipes/collections/air-fryer/
            // Example: /recipes/collections/air-fryer/air-fryer-banana-chips
            if (url.includes('/recipes/collections/air-fryer/')) {
              const pathParts = url.split('/recipes/collections/air-fryer/')[1];
              // Should have a recipe name, not be empty or just a slash
              return pathParts && pathParts.length > 0 && !pathParts.includes('/');
            }
            
            // For other recipe URLs, check if they have a recipe name
            const pathParts = url.split('/recipes/');
            if (pathParts.length > 1) {
              const afterRecipes = pathParts[1];
              // Should have content after /recipes/ and not be a collection/category
              return afterRecipes && 
                     afterRecipes.length > 0 && 
                     !excludePatterns.some(pattern => url.includes(pattern)) &&
                     !afterRecipes.match(/^(scottish|christmas|courses)/);
            }
            
            return false;
          });
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

        // Get image - try multiple selectors for ALDI recipe pages
        const imageElement = document.querySelector('img[src*="recipe"]') || 
                           document.querySelector('img[alt*="recipe"]') || 
                           document.querySelector('article img') ||
                           document.querySelector('main img[src*="."]') ||
                           document.querySelector('main img');
        let imageUrl = imageElement ? (imageElement as HTMLImageElement).src : null;
        
        // Ensure full URL if relative
        if (imageUrl && imageUrl.startsWith('/')) {
          imageUrl = `https://www.aldi.co.uk${imageUrl}`;
        }

        // Get prep time
        const prepTimeText = getText('[class*="prep"]') || getText('[class*="Prep"]');

        // Get cook time
        const cookTimeText = getText('[class*="cook"]') || getText('[class*="Cook"]');

        // Get servings
        const servingsText = getText('[class*="serving"]') || getText('[class*="Serving"]') || getText('[class*="serves"]');

        // Get difficulty
        const difficultyText = getText('[class*="difficulty"]') || getText('[class*="Difficulty"]');

        // Get ingredients - ALDI uses "Ingredients" section
        const ingredientsHeader = Array.from(document.querySelectorAll('h2, h3')).find(el => 
          el.textContent?.toLowerCase().includes('ingredient')
        );
        const ingredients = ingredientsHeader?.nextElementSibling?.querySelectorAll('li') ?
                          Array.from(ingredientsHeader.nextElementSibling.querySelectorAll('li')).map(li => li.textContent?.trim()).filter(Boolean) as string[] :
                          getAllText('[class*="ingredient"] li') || 
                          getAllText('[class*="Ingredient"] li') ||
                          getAllText('ul li').filter(text => 
                            text.match(/\d+/) && (text.includes('g') || text.includes('ml') || text.includes('tbsp') || text.includes('tsp') || text.includes('Banana'))
                          );

        // Get instructions - ALDI uses "Method" section  
        const methodHeader = Array.from(document.querySelectorAll('h2, h3')).find(el => 
          el.textContent?.toLowerCase().includes('method')
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
      logger.error(`Error scraping ALDI recipe ${url}:`, error);
      return null;
    }
  }
}

