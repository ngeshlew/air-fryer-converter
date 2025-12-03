// Recipe Detail Page Component

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppSidebar } from '@/components/dashboard/AppSidebar';
import { Header } from '@/components/dashboard/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useRecipeStore } from '@/store/useRecipeStore';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Clock, TrendingUp, Users, Thermometer, Timer } from 'lucide-react';

export const RecipeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentRecipe, isLoading, error, loadRecipe } = useRecipeStore();
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (id) {
      loadRecipe(id);
    }
  }, [id, loadRecipe]);

  if (isLoading) {
    return (
      <div className="lg:flex w-screen">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-4 lg:p-8">
            <div className="mx-auto max-w-4xl space-y-6">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-32 w-full" />
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !currentRecipe) {
    return (
      <div className="lg:flex w-screen">
        <div className="hidden lg:block">
          <AppSidebar />
        </div>
        <div className="flex-1 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-4 lg:p-8">
            <div className="mx-auto max-w-4xl">
              <div className="p-8 text-center">
                <h2 className="text-2xl font-normal mb-2">Recipe not found</h2>
                <p className="text-muted-foreground mb-4">{error || 'This recipe could not be loaded'}</p>
                <Button onClick={() => navigate('/recipes')}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Recipes
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:flex w-screen">
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        <Header />

        <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Back Button */}
            <Button variant="ghost" onClick={() => navigate('/recipes')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Recipes
            </Button>

            {/* Recipe Image */}
            {currentRecipe.imageUrl && !imageError ? (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <img
                  src={currentRecipe.imageUrl}
                  alt={currentRecipe.title}
                  className="h-full w-full object-cover"
                  onError={() => setImageError(true)}
                />
              </div>
            ) : currentRecipe.imageUrl && imageError ? (
              <div className="aspect-video w-full overflow-hidden rounded-lg bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <span className="text-4xl">🍳</span>
                  <p className="text-sm text-muted-foreground">Image unavailable</p>
                </div>
              </div>
            ) : null}

            {/* Recipe Header */}
            <div className="space-y-4">
              <h1 className="text-3xl font-normal">{currentRecipe.title}</h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <Badge variant="outline">{currentRecipe.supermarket.replace('_', ' ')}</Badge>
                {currentRecipe.cookTime && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Cook: {currentRecipe.cookTime} mins</span>
                  </div>
                )}
                {currentRecipe.prepTime && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Timer className="h-4 w-4" />
                    <span>Prep: {currentRecipe.prepTime} mins</span>
                  </div>
                )}
                {currentRecipe.difficulty && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <TrendingUp className="h-4 w-4" />
                    <span>{currentRecipe.difficulty}</span>
                  </div>
                )}
                {currentRecipe.servings && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>Serves {currentRecipe.servings}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {currentRecipe.tags && currentRecipe.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {currentRecipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {currentRecipe.description && (
              <div>
                <p className="text-muted-foreground">{currentRecipe.description}</p>
              </div>
            )}

            <Separator />

            {/* Air Fryer Settings */}
            {currentRecipe.cookTime && (
              <div className="bg-accent p-6 rounded-lg space-y-3">
                <h2 className="text-lg font-normal uppercase tracking-wide flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  Air Fryer Settings
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Temperature</p>
                    <p className="text-2xl font-mono font-normal">180°C</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time</p>
                    <p className="text-2xl font-mono font-normal">{currentRecipe.cookTime} mins</p>
                  </div>
                </div>
              </div>
            )}

            {/* Ingredients and Instructions */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Ingredients */}
              {currentRecipe.ingredients && Array.isArray(currentRecipe.ingredients) && currentRecipe.ingredients.length > 0 && (
                <div>
                  <h2 className="text-xl font-normal uppercase tracking-wide mb-4">
                    Ingredients
                  </h2>
                  <ul className="space-y-2">
                    {currentRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructions */}
              {currentRecipe.instructions && Array.isArray(currentRecipe.instructions) && currentRecipe.instructions.length > 0 && (
                <div>
                  <h2 className="text-xl font-normal uppercase tracking-wide mb-4">
                    Instructions
                  </h2>
                  <ol className="space-y-3">
                    {currentRecipe.instructions.map((step, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-normal">
                          {index + 1}
                        </span>
                        <span className="text-muted-foreground pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </main>

        <MobileNav />
      </div>
    </div>
  );
};

