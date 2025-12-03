// Header Component

import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background backdrop-blur supports-[backdrop-filter]:bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-2">
          {/* Title */}
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-normal uppercase tracking-wide">
              Air Fryer Converter
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

