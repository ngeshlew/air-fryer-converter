// Conversion Tips Component

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CONVERSION_TIPS } from '@/utils/conversions';
import { Check } from 'lucide-react';

export const ConversionTips: React.FC = () => {
  return (
    <Card className="border-dotted">
      <CardHeader>
        <CardTitle className="text-lg font-normal uppercase tracking-wide">
          Conversion Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {CONVERSION_TIPS.map((tip, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">{tip}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

