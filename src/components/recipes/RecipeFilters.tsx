// Recipe Filters Component

import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Supermarket } from '@/types';
import { X } from 'lucide-react';

interface RecipeFiltersProps {
  selectedSupermarket?: Supermarket;
  onSupermarketChange: (supermarket: Supermarket | undefined) => void;
  onClearFilters: () => void;
}

const SUPERMARKETS = [
  { value: 'ALDI', label: 'ALDI' },
  { value: 'WAITROSE', label: 'Waitrose' },
  { value: 'MARKS_AND_SPENCER', label: 'M&S' },
  { value: 'TESCO', label: 'Tesco' },
  { value: 'BBC_GOOD_FOOD', label: 'BBC Good Food' },
  { value: 'HAPPY_FOODIE', label: 'The Happy Foodie' },
];

export const RecipeFilters: React.FC<RecipeFiltersProps> = ({
  selectedSupermarket,
  onSupermarketChange,
  onClearFilters,
}) => {
  const hasActiveFilters = !!selectedSupermarket;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={selectedSupermarket || 'all'}
        onValueChange={(value) => 
          onSupermarketChange(value === 'all' ? undefined : (value as Supermarket))
        }
      >
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="All Supermarkets" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Supermarkets</SelectItem>
          {SUPERMARKETS.map((sm) => (
            <SelectItem key={sm.value} value={sm.value}>
              {sm.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClearFilters}
          className="gap-1"
        >
          <X className="h-4 w-4" />
          Clear Filters
        </Button>
      )}
    </div>
  );
};

