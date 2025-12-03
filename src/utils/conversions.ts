// Air Fryer Conversion Utilities

import { ConversionResult } from '@/types';

/**
 * Convert oven temperature to air fryer temperature
 * Reduces by 20°C by default, with a minimum of 140°C for safety
 */
export function convertTemperature(ovenTemp: number): number {
  return Math.max(ovenTemp - 20, 140);
}

/**
 * Adjust temperature if food is browning too quickly
 * Reduces by another 10°C
 */
export function adjustForBrowning(airFryerTemp: number): number {
  return Math.max(airFryerTemp - 10, 140);
}

/**
 * Convert oven time to air fryer time
 * Reduces by 20% by default, with a minimum of 5 minutes
 */
export function convertTime(ovenTime: number): number {
  const reduced = Math.round(ovenTime * 0.8);
  return Math.max(reduced, 5);
}

/**
 * Calculate when to start checking food
 * Returns 60% of total air fryer time
 */
export function getCheckTime(airFryerTime: number): number {
  return Math.round(airFryerTime * 0.6);
}

/**
 * Complete conversion from oven to air fryer settings
 */
export function convertOvenToAirFryer(
  ovenTemp: number,
  ovenTime: number
): ConversionResult {
  const airFryerTemp = convertTemperature(ovenTemp);
  const airFryerTime = convertTime(ovenTime);
  const checkTime = getCheckTime(airFryerTime);
  const tempReduction = ovenTemp - airFryerTemp;
  const timeReduction = Math.round(((ovenTime - airFryerTime) / ovenTime) * 100);

  return {
    ovenTemp,
    ovenTime,
    airFryerTemp,
    airFryerTime,
    checkTime,
    tempReduction,
    timeReduction,
  };
}

/**
 * Validate temperature input (Celsius)
 * Range: 100°C to 250°C
 */
export function validateTemperature(temp: number): boolean {
  return temp >= 100 && temp <= 250;
}

/**
 * Validate time input (minutes)
 * Range: 1 to 180 minutes (3 hours)
 */
export function validateTime(time: number): boolean {
  return time >= 1 && time <= 180;
}

/**
 * Common oven temperatures for quick selection
 */
export const COMMON_TEMPERATURES = [
  { celsius: 140, label: '140°C - Low' },
  { celsius: 160, label: '160°C - Moderate' },
  { celsius: 180, label: '180°C - Moderate Hot' },
  { celsius: 190, label: '190°C - Hot' },
  { celsius: 200, label: '200°C - Hot' },
  { celsius: 220, label: '220°C - Very Hot' },
];

/**
 * Conversion tips for users
 */
export const CONVERSION_TIPS = [
  'Reduce temperature by 10-20°C from oven settings',
  'Reduce cooking time by 20-25% from oven settings',
  "Don't overcrowd the air fryer basket",
  'Shake or flip food halfway through cooking',
  'Check food a few minutes before time is up',
  'Use a meat thermometer for proteins',
  'Preheat your air fryer for best results',
  'Lightly spray with oil for extra crispiness',
];

