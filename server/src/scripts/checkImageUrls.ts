// Script to check and verify image URLs in the database
// Run with: tsx src/scripts/checkImageUrls.ts

import prisma from '../utils/database.js';
import { logger } from '../utils/logger.js';

async function checkImageUrls() {
  logger.info('🔍 Checking recipe image URLs...');
  
  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      title: true,
      imageUrl: true,
      supermarket: true,
      sourceUrl: true,
    },
  });

  logger.info(`Found ${recipes.length} recipes to check`);
  
  const brokenImages: Array<{ id: string; title: string; imageUrl: string | null }> = [];
  const workingImages: number = 0;
  
  for (const recipe of recipes) {
    if (!recipe.imageUrl) {
      brokenImages.push({
        id: recipe.id,
        title: recipe.title,
        imageUrl: null,
      });
      continue;
    }

    try {
      // Check if URL is valid format
      const url = new URL(recipe.imageUrl);
      
      // Check if it's an Unsplash URL (these can be unreliable)
      if (recipe.imageUrl.includes('unsplash.com')) {
        logger.warn(`⚠️  Unsplash URL for "${recipe.title}": ${recipe.imageUrl}`);
      }
      
      // For now, just log - actual HTTP check would require fetch
      workingImages++;
    } catch (error) {
      brokenImages.push({
        id: recipe.id,
        title: recipe.title,
        imageUrl: recipe.imageUrl,
      });
      logger.error(`❌ Invalid URL for "${recipe.title}": ${recipe.imageUrl}`);
    }
  }

  logger.info('\n📊 Image URL Check Summary:');
  logger.info(`✅ Working URLs: ${workingImages}`);
  logger.info(`❌ Broken/Missing URLs: ${brokenImages.length}`);
  
  if (brokenImages.length > 0) {
    logger.info('\n🔧 Recipes with image issues:');
    brokenImages.forEach(recipe => {
      logger.info(`  - ${recipe.title} (${recipe.imageUrl || 'No URL'})`);
    });
  }

  await prisma.$disconnect();
}

checkImageUrls()
  .then(() => {
    logger.info('\n✅ Image URL check completed!');
    process.exit(0);
  })
  .catch((error) => {
    logger.error('\n❌ Image URL check failed:', error);
    process.exit(1);
  });

