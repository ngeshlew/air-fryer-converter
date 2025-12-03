// Recipe Card Component

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Recipe } from '@/types';
import { Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="border-dotted overflow-hidden cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
      onClick={() => navigate(`/recipe/${recipe.id}`)}
    >
      {/* Recipe Image */}
      <div className="aspect-video w-full overflow-hidden bg-muted">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground">
            <span className="text-sm">No image</span>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Recipe Title */}
        <h3 className="font-semibold line-clamp-2 min-h-[2.5rem]">
          {recipe.title}
        </h3>

        {/* Recipe Meta */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline" className="text-xs">
            {recipe.supermarket.replace('_', ' ')}
          </Badge>
          {recipe.cookTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{recipe.cookTime} mins</span>
            </div>
          )}
          {recipe.difficulty && (
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>{recipe.difficulty}</span>
            </div>
          )}
        </div>

        {/* Recipe Tags */}
        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {recipe.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

