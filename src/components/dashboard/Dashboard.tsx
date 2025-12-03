// Main Dashboard Component

import React from 'react';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { CalculatorForm } from '@/components/calculator/CalculatorForm';
import { ConversionTips } from '@/components/calculator/ConversionTips';
import { RecipeOfTheDay } from '@/components/recipes/RecipeOfTheDay';

export const Dashboard: React.FC = () => {
  return (
    <div className="lg:flex w-screen">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden lg:block">
        <AppSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 pb-20 lg:pb-8">
          <div className="mx-auto max-w-4xl space-y-8">
            {/* Calculator Section */}
            <section>
              <CalculatorForm />
            </section>

            {/* Recipe of the Day Section */}
            <section>
              <RecipeOfTheDay />
            </section>

            {/* Conversion Tips Section */}
            <section>
              <ConversionTips />
            </section>
          </div>
        </main>

        {/* Mobile Navigation - Hidden on desktop */}
        <MobileNav />
      </div>
    </div>
  );
};

