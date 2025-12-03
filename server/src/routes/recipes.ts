// Recipe routes

import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../utils/database.js';
import { logger } from '../utils/logger.js';

const router = Router();

// GET /api/recipes - List all recipes with filters
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { supermarket, search, featured, limit = '100', offset = '0' } = req.query;

    const where: any = {
      isActive: true,
    };

    if (supermarket) {
      where.supermarket = supermarket;
    }

    if (search && typeof search === 'string') {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (featured === 'true') {
      where.isFeatured = true;
    }

    const recipes = await prisma.recipe.findMany({
      where,
      take: parseInt(limit as string, 10),
      skip: parseInt(offset as string, 10),
      orderBy: {
        scrapedAt: 'desc',
      },
    });

    res.json({
      success: true,
      data: recipes,
      count: recipes.length,
    });
  } catch (error) {
    logger.error('Error fetching recipes:', error);
    next(error);
  }
});

// GET /api/recipes/featured - Get featured recipe (recipe of the day)
router.get('/featured', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    // Get a random featured recipe
    const featuredRecipes = await prisma.recipe.findMany({
      where: {
        isFeatured: true,
        isActive: true,
      },
    });

    if (featuredRecipes.length === 0) {
      // If no featured recipes, get any random recipe
      const allRecipes = await prisma.recipe.findMany({
        where: { isActive: true },
        take: 10,
      });

      if (allRecipes.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'No recipes available',
        });
      }

      const randomRecipe = allRecipes[Math.floor(Math.random() * allRecipes.length)];
      return res.json({
        success: true,
        data: randomRecipe,
      });
    }

    const randomFeaturedRecipe =
      featuredRecipes[Math.floor(Math.random() * featuredRecipes.length)];

    res.json({
      success: true,
      data: randomFeaturedRecipe,
    });
  } catch (error) {
    logger.error('Error fetching featured recipe:', error);
    next(error);
  }
});

// GET /api/recipes/supermarkets - Get list of supermarkets with recipe counts
router.get('/supermarkets', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const supermarkets = await prisma.recipe.groupBy({
      by: ['supermarket'],
      where: { isActive: true },
      _count: true,
    });

    const formattedSupermarkets = supermarkets.map((s) => ({
      supermarket: s.supermarket,
      count: s._count,
    }));

    res.json({
      success: true,
      data: formattedSupermarkets,
    });
  } catch (error) {
    logger.error('Error fetching supermarkets:', error);
    next(error);
  }
});

// GET /api/recipes/:id - Get single recipe by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const recipe = await prisma.recipe.findUnique({
      where: { id },
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        error: 'Recipe not found',
      });
    }

    res.json({
      success: true,
      data: recipe,
    });
  } catch (error) {
    logger.error('Error fetching recipe:', error);
    next(error);
  }
});

export default router;

