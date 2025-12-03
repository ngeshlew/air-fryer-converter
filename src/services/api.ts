// API Service for Air Fryer Converter

import { Recipe, RecipeFilters, ScrapingLog, ApiResponse } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'An error occurred',
        };
      }

      return {
        success: true,
        data: data.data || data,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  // Recipe endpoints
  async getRecipes(filters?: RecipeFilters): Promise<ApiResponse<Recipe[]>> {
    const params = new URLSearchParams();
    
    if (filters?.supermarket) params.append('supermarket', filters.supermarket);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.featured !== undefined) params.append('featured', filters.featured.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.offset) params.append('offset', filters.offset.toString());

    const query = params.toString();
    return this.request<Recipe[]>(`/api/recipes${query ? `?${query}` : ''}`);
  }

  async getRecipe(id: string): Promise<ApiResponse<Recipe>> {
    return this.request<Recipe>(`/api/recipes/${id}`);
  }

  async getFeaturedRecipe(): Promise<ApiResponse<Recipe>> {
    return this.request<Recipe>('/api/recipes/featured');
  }

  async getSupermarkets(): Promise<ApiResponse<{ supermarket: string; count: number }[]>> {
    return this.request('/api/recipes/supermarkets');
  }

  // Scraping endpoints (admin/internal)
  async triggerScraping(supermarket: string): Promise<ApiResponse<{ message: string }>> {
    return this.request('/api/scraping/trigger', {
      method: 'POST',
      body: JSON.stringify({ supermarket }),
    });
  }

  async getScrapingLogs(limit = 50): Promise<ApiResponse<ScrapingLog[]>> {
    return this.request<ScrapingLog[]>(`/api/scraping/logs?limit=${limit}`);
  }

  async getScrapingStatus(): Promise<ApiResponse<{ status: string; lastRun?: Date }>> {
    return this.request('/api/scraping/status');
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<{ status: string }>> {
    return this.request('/api/health');
  }
}

export const apiService = new ApiService(API_BASE_URL);

