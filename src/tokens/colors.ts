/**
 * Design Tokens - Colors
 * 
 * Defines the main colors of the design system.
 * These tokens can be customized from Storybook.
 */

export interface TextColorTokens {
  primary: string; // Dark text for light backgrounds
  secondary: string; // Secondary text
  inverse: string; // Light text for dark backgrounds
  onPrimary: string; // Text on primary color
  onSecondary: string; // Text on secondary color
  onAccent: string; // Text on accent color
}

export interface ColorTokens {
  primary: string;
  secondary: string;
  accent: string;
  text: TextColorTokens;
}

export const defaultTextColors: TextColorTokens = {
  primary: '#1a1a1a', // Dark text for light backgrounds (AAA)
  secondary: '#4a5568', // Secondary text (AAA)
  inverse: '#ffffff', // Light text for dark backgrounds (AAA)
  onPrimary: '#ffffff', // Text on primary color (AAA)
  onSecondary: '#ffffff', // Text on secondary color (AAA)
  onAccent: '#1a1a1a', // Text on accent color (AAA)
};

export const defaultColors: ColorTokens = {
  primary: '#2563eb',
  secondary: '#64748b',
  accent: '#f59e0b',
  text: defaultTextColors,
};

// Automatically generates color variations
export const generateColorVariations = (baseColor: string) => {
  return {
    '50': adjustBrightness(baseColor, 0.95),
    '100': adjustBrightness(baseColor, 0.9),
    '200': adjustBrightness(baseColor, 0.8),
    '300': adjustBrightness(baseColor, 0.7),
    '400': adjustBrightness(baseColor, 0.5),
    '500': baseColor,
    '600': adjustBrightness(baseColor, -0.1),
    '700': adjustBrightness(baseColor, -0.2),
    '800': adjustBrightness(baseColor, -0.3),
    '900': adjustBrightness(baseColor, -0.4),
  };
};

// Helper function to adjust the brightness of a HEX color
const adjustBrightness = (hex: string, amount: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, ((num >> 16) & 0xff) + Math.round(255 * amount)));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0xff) + Math.round(255 * amount)));
  const b = Math.max(0, Math.min(255, ((num >> 0) & 0xff) + Math.round(255 * amount)));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

