// Recipe Utility Functions

/**
 * Extract air fryer temperature from recipe instructions
 * Looks for patterns like "170°C", "170 C", "preheat to 170", etc.
 * Prioritizes temperatures mentioned with "preheat" or "air fryer"
 */
export function extractTemperatureFromInstructions(instructions: string[]): number | null {
  if (!instructions || instructions.length === 0) {
    return null;
  }

  // Combine all instructions into one text
  const combinedText = instructions.join(' ').toLowerCase();

  // Priority patterns (most specific first):
  // 1. "preheat air fryer to 170°C" or "preheat the air fryer to 170"
  // 2. "preheat to 170°C"
  // 3. "set air fryer to 170°C"
  // 4. "cook at 170°C" or "cook for X minutes at 170°C"
  // 5. Any "170°C" or "170 C" pattern
  
  const priorityPatterns = [
    /preheat.*?air.*?fryer.*?to.*?(\d+)\s*°?\s*c/i,  // "preheat air fryer to 170°C"
    /preheat.*?the.*?air.*?fryer.*?to.*?(\d+)/i,     // "preheat the air fryer to 170"
    /preheat.*?to.*?(\d+)\s*°?\s*c/i,                 // "preheat to 170°C"
    /set.*?air.*?fryer.*?to.*?(\d+)\s*°?\s*c/i,      // "set air fryer to 170°C"
    /cook.*?at.*?(\d+)\s*°?\s*c/i,                    // "cook at 170°C"
  ];

  // Try priority patterns first
  for (const pattern of priorityPatterns) {
    const match = combinedText.match(pattern);
    if (match) {
      const temp = parseInt(match[1], 10);
      // Validate temperature is in reasonable range (100-250°C)
      if (temp >= 100 && temp <= 250) {
        return temp;
      }
    }
  }

  // Fallback: look for any temperature pattern in the first instruction (most likely to have preheat info)
  if (instructions[0]) {
    const firstInstruction = instructions[0].toLowerCase();
    const fallbackPattern = /(\d{3})\s*°?\s*c/i; // Match 3-digit temperatures like 170°C
    const match = firstInstruction.match(fallbackPattern);
    if (match) {
      const temp = parseInt(match[1], 10);
      if (temp >= 100 && temp <= 250) {
        return temp;
      }
    }
  }

  return null;
}

/**
 * Calculate air fryer temperature from standard oven temperature
 * Default: 20°C lower than standard 180°C oven = 160°C
 */
export function calculateAirFryerTemperature(ovenTemp: number = 180): number {
  return Math.max(ovenTemp - 20, 140);
}

/**
 * Calculate air fryer cooking time (20% reduction)
 */
export function calculateAirFryerTime(ovenTime: number): number {
  return Math.max(Math.round(ovenTime * 0.8), 1);
}

