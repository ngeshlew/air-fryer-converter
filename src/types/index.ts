// Air Fryer Converter Types

export enum Supermarket {
  ALDI = 'ALDI',
  WAITROSE = 'WAITROSE',
  MARKS_AND_SPENCER = 'MARKS_AND_SPENCER',
  TESCO = 'TESCO',
  BBC_GOOD_FOOD = 'BBC_GOOD_FOOD',
  HAPPY_FOODIE = 'HAPPY_FOODIE',
}

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}

export enum ScrapingStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface Recipe {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  sourceUrl: string;
  supermarket: Supermarket;
  cookTime: number | null; // in minutes
  prepTime: number | null; // in minutes
  difficulty: Difficulty | null;
  servings: number | null;
  ingredients: string[]; // JSON array
  instructions: string[]; // JSON array
  tags: string[];
  scrapedAt: Date;
  lastUpdated: Date;
  isActive: boolean;
  isFeatured: boolean;
}

export interface ScrapingLog {
  id: string;
  supermarket: Supermarket;
  startedAt: Date;
  completedAt: Date | null;
  status: ScrapingStatus;
  recipesFound: number;
  recipesAdded: number;
  recipesUpdated: number;
  errorMessage: string | null;
}

export interface ConversionResult {
  ovenTemp: number;
  ovenTime: number;
  airFryerTemp: number;
  airFryerTime: number;
  checkTime: number;
  tempReduction: number;
  timeReduction: number;
}

export interface RecipeFilters {
  supermarket?: Supermarket;
  search?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

