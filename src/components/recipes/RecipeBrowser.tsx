// Recipe Browser Page Component

import React, { useEffect } from 'react';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { Header } from '@/components/dashboard/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { RecipeCard } from './RecipeCard';
import { RecipeSearch } from './RecipeSearch';
import { RecipeFilters } from './RecipeFilters';
import { useRecipeStore } from '@/store/useRecipeStore';
import { Skeleton } from '@/components/ui/skeleton';
import { ChefHat } from 'lucide-react';
import { Supermarket } from '@/types';

export const RecipeBrowser: React.FC = () => {
  const { recipes, isLoading, error, filters, loadRecipes, searchRecipes, filterBySupermarket, clearFilters } = useRecipeStore();

  useEffect(() => {
    loadRecipes();
  }, [loadRecipes]);

  const handleSearch = (query: string) => {
    searchRecipes(query);
  };

  const handleSupermarketFilter = (supermarket: Supermarket | undefined) => {
    filterBySupermarket(supermarket);
  };

  const handleClearFilters = () => {
    clearFilters();
  };

  return (
    <div className="lg:flex w-screen">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header />

        <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8">
          <div className="mx-auto max-w-7xl space-y-6">
            {/* Page Header */}
            <div>
              <h1 className="text-3xl font-normal uppercase tracking-wide mb-2">
                Air Fryer Recipes
              </h1>
              <p className="text-muted-foreground">
                Browse recipes from UK supermarkets
              </p>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
              <RecipeSearch onSearch={handleSearch} />
              <RecipeFilters
                selectedSupermarket={filters.supermarket}
                onSupermarketChange={handleSupermarketFilter}
                onClearFilters={handleClearFilters}
              />
            </div>

            {/* Error State */}
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive">
                {error}
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-video w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isLoading && recipes.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <ChefHat className="h-16 w-16 mb-4 text-muted-foreground/50" />
                <h3 className="text-xl font-normal mb-2">No recipes found</h3>
                <p className="text-muted-foreground mb-4">
                  {filters.search || filters.supermarket
                    ? 'Try adjusting your filters or search query'
                    : 'Check back soon for delicious air fryer recipes'}
                </p>
              </div>
            )}

            {/* Recipe Grid */}
            {!isLoading && recipes.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-4">
                  Showing {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        <MobileNav />
      </div>
    </div>
  );
};

