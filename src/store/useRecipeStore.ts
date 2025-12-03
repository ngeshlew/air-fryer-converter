// Recipe Store - Zustand State Management

import { create } from 'zustand';
import { Recipe, RecipeFilters, Supermarket } from '@/types';
import { apiService } from '@/services/api';

interface RecipeStore {
  // State
  recipes: Recipe[];
  featuredRecipe: Recipe | null;
  currentRecipe: Recipe | null;
  isLoading: boolean;
  error: string | null;
  filters: RecipeFilters;

  // Actions
  loadRecipes: (filters?: RecipeFilters) => Promise<void>;
  loadFeaturedRecipe: () => Promise<void>;
  loadRecipe: (id: string) => Promise<void>;
  searchRecipes: (query: string) => Promise<void>;
  filterBySupermarket: (supermarket: Supermarket | undefined) => Promise<void>;
  setFilters: (filters: RecipeFilters) => void;
  clearFilters: () => void;
  clearError: () => void;
}

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  // Initial state
  recipes: [],
  featuredRecipe: null,
  currentRecipe: null,
  isLoading: false,
  error: null,
  filters: {},

  // Load all recipes with optional filters
  loadRecipes: async (filters?: RecipeFilters) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await apiService.getRecipes(filters || get().filters);
      
      if (response.success && response.data) {
        set({ recipes: response.data, isLoading: false });
      } else {
        set({ 
          error: response.error || 'Failed to load recipes', 
          isLoading: false 
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load recipes',
        isLoading: false 
      });
    }
  },

  // Load featured recipe (recipe of the day)
  loadFeaturedRecipe: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await apiService.getFeaturedRecipe();
      
      if (response.success && response.data) {
        set({ featuredRecipe: response.data, isLoading: false });
      } else {
        set({ 
          error: response.error || 'Failed to load featured recipe', 
          isLoading: false 
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load featured recipe',
        isLoading: false 
      });
    }
  },

  // Load single recipe by ID
  loadRecipe: async (id: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await apiService.getRecipe(id);
      
      if (response.success && response.data) {
        set({ currentRecipe: response.data, isLoading: false });
      } else {
        set({ 
          error: response.error || 'Failed to load recipe', 
          isLoading: false 
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load recipe',
        isLoading: false 
      });
    }
  },

  // Search recipes by query
  searchRecipes: async (query: string) => {
    const newFilters = { ...get().filters, search: query, limit: 100 };
    set({ filters: newFilters });
    await get().loadRecipes(newFilters);
  },

  // Filter recipes by supermarket
  filterBySupermarket: async (supermarket: Supermarket | undefined) => {
    const newFilters = { ...get().filters, supermarket, limit: 100 };
    set({ filters: newFilters });
    await get().loadRecipes(newFilters);
  },

  // Set custom filters
  setFilters: (filters: RecipeFilters) => {
    set({ filters });
  },

  // Clear all filters
  clearFilters: () => {
    set({ filters: {} });
    get().loadRecipes({});
  },

  // Clear error message
  clearError: () => {
    set({ error: null });
  },
}));

