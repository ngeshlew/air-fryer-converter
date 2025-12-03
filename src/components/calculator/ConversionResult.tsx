// Conversion Result Display Component

import React from 'react';
import { ConversionResult } from '@/types';
import { Separator } from '@/components/ui/separator';
import { Thermometer, Timer, Lightbulb } from 'lucide-react';

interface ConversionResultDisplayProps {
  result: ConversionResult;
}

export const ConversionResultDisplay: React.FC<ConversionResultDisplayProps> = ({ result }) => {
  return (
    <div className="space-y-4 mt-6 pt-6 border-t border-dotted">
      <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
        Air Fryer Settings
      </h3>

      {/* Temperature Result */}
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <Thermometer className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Temperature</p>
          <p className="text-2xl font-mono font-semibold">
            {result.airFryerTemp}°C
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            ({result.tempReduction}°C lower than oven)
          </p>
        </div>
      </div>

      <Separator />

      {/* Time Result */}
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <Timer className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">Cooking Time</p>
          <p className="text-2xl font-mono font-semibold">
            {result.airFryerTime} minutes
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            ({result.timeReduction}% shorter than oven)
          </p>
        </div>
      </div>

      <Separator />

      {/* Check Time Tip */}
      <div className="flex items-start gap-3 p-3 bg-accent rounded-md">
        <div className="mt-0.5">
          <Lightbulb className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">Pro Tip</p>
          <p className="text-sm text-muted-foreground mt-1">
            Start checking your food at <span className="font-mono font-semibold">{result.checkTime} minutes</span> to prevent overcooking
          </p>
        </div>
      </div>

      {/* Food Browning Tip */}
      {result.airFryerTemp > 180 && (
        <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-md">
          <p className="font-medium">If food is browning too quickly:</p>
          <p className="mt-1">Reduce temperature by another 10°C to {result.airFryerTemp - 10}°C</p>
        </div>
      )}
    </div>
  );
};

