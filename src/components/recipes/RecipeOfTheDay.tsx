// Recipe of the Day Card Component

import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useRecipeStore } from '@/store/useRecipeStore';
import { ChefHat, Clock, TrendingUp } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export const RecipeOfTheDay: React.FC = () => {
  const navigate = useNavigate();
  const { featuredRecipe, isLoading, loadFeaturedRecipe } = useRecipeStore();

  useEffect(() => {
    loadFeaturedRecipe();
  }, [loadFeaturedRecipe]);

  if (isLoading) {
    return (
      <Card className="border-dotted">
        <CardHeader>
          <CardTitle className="text-lg font-normal uppercase tracking-wide">
            Recipe of the Day
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-48 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    );
  }

  if (!featuredRecipe) {
    return (
      <Card className="border-dotted">
        <CardHeader>
          <CardTitle className="text-lg font-normal uppercase tracking-wide">
            Recipe of the Day
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-48 text-center">
          <ChefHat className="h-12 w-12 mb-4 text-muted-foreground/50" />
          <h3 className="text-lg font-normal mb-2">No recipes available yet</h3>
          <p className="text-sm text-muted-foreground">
            Check back soon for delicious air fryer recipes
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-dotted overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg font-normal uppercase tracking-wide">
          Recipe of the Day
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Recipe Image */}
        {featuredRecipe.imageUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-md bg-muted">
            <img
              src={featuredRecipe.imageUrl}
              alt={featuredRecipe.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* Recipe Title */}
        <div>
          <h3 className="text-xl font-semibold mb-2">{featuredRecipe.title}</h3>
          
          {/* Recipe Meta */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">{featuredRecipe.supermarket.replace('_', ' ')}</Badge>
            {featuredRecipe.cookTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{featuredRecipe.cookTime} mins</span>
              </div>
            )}
            {featuredRecipe.difficulty && (
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                <span>{featuredRecipe.difficulty}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {featuredRecipe.description && (
          <p className="text-sm text-muted-foreground line-clamp-3">
            {featuredRecipe.description}
          </p>
        )}

        {/* Action Button */}
        <Button
          onClick={() => navigate(`/recipe/${featuredRecipe.id}`)}
          className="w-full"
        >
          View Recipe
        </Button>
      </CardContent>
    </Card>
  );
};

