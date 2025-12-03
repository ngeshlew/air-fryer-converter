// Helper functions to generate evaluation code as strings
// This avoids TypeScript compilation issues with page.evaluate()

export const getRecipeEvaluationCode = () => {
  return `
    (function() {
      const getText = function(selector) {
        const element = document.querySelector(selector);
        return element ? (element.textContent || '').trim() : null;
      };

      const getAllText = function(selector) {
        const elements = Array.from(document.querySelectorAll(selector));
        return elements
          .map(function(el) { return (el.textContent || '').trim(); })
          .filter(function(text) { return text !== null && text !== undefined && text !== ''; });
      };

      const title = getText('h1') || getText('[class*="recipe-header"] h1') || getText('[class*="title"]');
      const description = getText('[class*="recipe-description"]') || 
                        getText('[class*="description"]') || 
                        getText('[class*="intro"]') ||
                        getText('p');

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
      
      let imageUrl = null;
      for (let i = 0; i < imageSelectors.length; i++) {
        const selector = imageSelectors[i];
        const img = document.querySelector(selector);
        if (img && img.src) {
          if (!img.src.startsWith('data:') && img.naturalWidth > 200) {
            imageUrl = img.src;
            break;
          }
        }
      }
      
      if (imageUrl && imageUrl.startsWith('/')) {
        imageUrl = window.location.origin + imageUrl;
      }
      
      if (imageUrl && imageUrl.includes('?')) {
        const urlParts = imageUrl.split('?');
        imageUrl = urlParts[0];
      }

      const prepTimeText = getText('[class*="prep"]') || 
                         getText('[class*="Prep"]') ||
                         getText('[data-test*="prep"]') ||
                         getText('[aria-label*="prep"]');

      const cookTimeText = getText('[class*="cook"]') || 
                         getText('[class*="Cook"]') ||
                         getText('[data-test*="cook"]') ||
                         getText('[aria-label*="cook"]');

      const servingsText = getText('[class*="serving"]') || 
                         getText('[class*="Serving"]') || 
                         getText('[class*="serves"]') ||
                         getText('[data-test*="serves"]');

      const difficultyText = getText('[class*="difficulty"]') || 
                           getText('[class*="Difficulty"]') ||
                           getText('[data-test*="difficulty"]');

      const ingredientsHeader = Array.from(document.querySelectorAll('h2, h3')).find(function(el) {
        return el.textContent && el.textContent.toLowerCase().includes('ingredient');
      });
      
      let ingredients = [];
      if (ingredientsHeader && ingredientsHeader.nextElementSibling) {
        const liElements = ingredientsHeader.nextElementSibling.querySelectorAll('li');
        ingredients = Array.from(liElements).map(function(li) {
          return (li.textContent || '').trim();
        }).filter(function(text) {
          return text !== null && text !== undefined && text !== '';
        });
      }
      
      if (ingredients.length === 0) {
        ingredients = getAllText('[class*="ingredient"] li');
        if (ingredients.length === 0) {
          ingredients = getAllText('[class*="Ingredient"] li');
        }
        if (ingredients.length === 0) {
          ingredients = getAllText('ul li').filter(function(text) {
            return text.match(/\\d+/) && (text.includes('g') || text.includes('ml') || text.includes('tbsp') || text.includes('tsp'));
          });
        }
      }

      const methodHeader = Array.from(document.querySelectorAll('h2, h3')).find(function(el) {
        const text = el.textContent ? el.textContent.toLowerCase() : '';
        return text.includes('method') || text.includes('instruction');
      });
      
      let instructions = [];
      if (methodHeader && methodHeader.nextElementSibling) {
        const liElements = methodHeader.nextElementSibling.querySelectorAll('ol li, li');
        instructions = Array.from(liElements).map(function(li) {
          return (li.textContent || '').trim();
        }).filter(function(text) {
          return text !== null && text !== undefined && text !== '';
        });
      }
      
      if (instructions.length === 0) {
        instructions = getAllText('[class*="instruction"] li');
        if (instructions.length === 0) {
          instructions = getAllText('[class*="Instruction"] li');
        }
        if (instructions.length === 0) {
          instructions = getAllText('[class*="method"] li');
        }
        if (instructions.length === 0) {
          instructions = getAllText('[class*="Method"] li');
        }
        if (instructions.length === 0) {
          instructions = getAllText('ol li');
        }
      }

      return {
        title: title,
        description: description,
        imageUrl: imageUrl,
        prepTimeText: prepTimeText,
        cookTimeText: cookTimeText,
        servingsText: servingsText,
        difficultyText: difficultyText,
        ingredients: ingredients,
        instructions: instructions
      };
    })();
  `;
};

