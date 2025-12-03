// Air Fryer Calculator Form Component

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { convertOvenToAirFryer, validateTemperature, validateTime, COMMON_TEMPERATURES } from '@/utils/conversions';
import { ConversionResult } from '@/types';
import { ConversionResultDisplay } from './ConversionResult';
import { AlertCircle } from 'lucide-react';

export const CalculatorForm: React.FC = () => {
  const [ovenTemp, setOvenTemp] = useState<number>(180);
  const [ovenTime, setOvenTime] = useState<number>(30);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string>('');

  const handleCalculate = () => {
    setError('');

    // Validate inputs
    if (!validateTemperature(ovenTemp)) {
      setError('Temperature must be between 100°C and 250°C');
      return;
    }

    if (!validateTime(ovenTime)) {
      setError('Time must be between 1 and 180 minutes');
      return;
    }

    // Calculate conversion
    const conversionResult = convertOvenToAirFryer(ovenTemp, ovenTime);
    setResult(conversionResult);
  };

  const handleReset = () => {
    setOvenTemp(180);
    setOvenTime(30);
    setResult(null);
    setError('');
  };

  return (
    <Card className="border-dotted">
      <CardHeader>
        <CardTitle className="text-lg font-normal uppercase tracking-wide">
          Oven to Air Fryer Calculator
        </CardTitle>
        <CardDescription>
          Convert your oven recipe to air fryer settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Oven Temperature and Time Inputs - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Column 1: Oven Temperature Input */}
          <div className="space-y-2">
            <Label htmlFor="oven-temp">Oven Temperature (°C)</Label>
            <Select
              value={ovenTemp.toString()}
              onValueChange={(value) => setOvenTemp(parseInt(value, 10))}
            >
              <SelectTrigger id="oven-temp">
                <SelectValue>
                  {COMMON_TEMPERATURES.find(t => t.celsius === ovenTemp)?.label || `${ovenTemp}°C`}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {COMMON_TEMPERATURES.map((temp) => (
                  <SelectItem key={temp.celsius} value={temp.celsius.toString()}>
                    {temp.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Or enter custom temperature (100-250°C)
            </p>
            <Input
              type="number"
              min="100"
              max="250"
              value={ovenTemp}
              onChange={(e) => setOvenTemp(parseInt(e.target.value, 10) || 180)}
              className="font-mono"
            />
          </div>

          {/* Column 2: Oven Time Input */}
          <div className="space-y-2">
            <Label htmlFor="oven-time">Oven Time (minutes)</Label>
            <Input
              id="oven-time"
              type="number"
              min="1"
              max="180"
              value={ovenTime}
              onChange={(e) => setOvenTime(parseInt(e.target.value, 10) || 30)}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Enter cooking time (1-180 minutes)
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
            <AlertCircle className="h-4 w-4 text-destructive" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={handleCalculate} 
            className="flex-1 bg-[hsl(0,84%,60%)] hover:bg-[hsl(0,84%,55%)] text-white"
          >
            Calculate
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>

        {/* Conversion Result */}
        {result && <ConversionResultDisplay result={result} />}
      </CardContent>
    </Card>
  );
};

