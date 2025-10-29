/**
 * Color Contrast Utilities
 * 
 * WCAG 2.1 Contrast Requirements:
 * - Level AA (Normal text): 4.5:1
 * - Level AA (Large text): 3:1
 * - Level AAA (Normal text): 7:1
 * - Level AAA (Large text): 4.5:1
 */

export interface ContrastRatio {
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
  passesAALarge: boolean;
  passesAAALarge: boolean;
}

/**
 * Converts hex color to RGB
 */
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

/**
 * Calculates relative luminance of a color
 * https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
const getRelativeLuminance = (rgb: { r: number; g: number; b: number }): number => {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((val) => {
    val = val / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/**
 * Calculates contrast ratio between two colors
 * https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
export const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const lum1 = getRelativeLuminance(rgb1);
  const lum2 = getRelativeLuminance(rgb2);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Evaluates contrast ratio and returns compliance information
 */
export const evaluateContrast = (foreground: string, background: string): ContrastRatio => {
  const ratio = getContrastRatio(foreground, background);

  return {
    ratio: Math.round(ratio * 100) / 100,
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7.0,
    passesAALarge: ratio >= 3.0,
    passesAAALarge: ratio >= 4.5,
  };
};

/**
 * Finds the best text color (black or white) for a given background
 * Returns the color with better contrast ratio
 */
export const getBestTextColor = (backgroundColor: string): string => {
  const contrastWithBlack = getContrastRatio('#000000', backgroundColor);
  const contrastWithWhite = getContrastRatio('#ffffff', backgroundColor);

  return contrastWithBlack > contrastWithWhite ? '#000000' : '#ffffff';
};

/**
 * Ensures AAA compliance by finding a suitable text color
 * If current color doesn't meet AAA, returns best available
 */
export const ensureAAATextColor = (
  backgroundColor: string,
  currentTextColor?: string
): { color: string; contrast: ContrastRatio } => {
  const black = '#000000';
  const white = '#ffffff';

  const contrastBlack = evaluateContrast(black, backgroundColor);
  const contrastWhite = evaluateContrast(white, backgroundColor);

  // Prefer current color if it passes AAA
  if (currentTextColor) {
    const currentContrast = evaluateContrast(currentTextColor, backgroundColor);
    if (currentContrast.passesAAA) {
      return { color: currentTextColor, contrast: currentContrast };
    }
  }

  // Choose best contrast that meets AAA
  if (contrastBlack.passesAAA && contrastWhite.passesAAA) {
    return contrastBlack.ratio > contrastWhite.ratio
      ? { color: black, contrast: contrastBlack }
      : { color: white, contrast: contrastWhite };
  }

  if (contrastBlack.passesAAA) {
    return { color: black, contrast: contrastBlack };
  }

  if (contrastWhite.passesAAA) {
    return { color: white, contrast: contrastWhite };
  }

  // If neither meets AAA, return best available
  return contrastBlack.ratio > contrastWhite.ratio
    ? { color: black, contrast: contrastBlack }
    : { color: white, contrast: contrastWhite };
};

/**
 * Adjusts a color to meet minimum contrast requirement
 */
export const adjustColorForContrast = (
  backgroundColor: string
): string => {
  const rgb = hexToRgb(backgroundColor);
  const lum = getRelativeLuminance(rgb);

  // Simple approach: invert and adjust
  if (lum > 0.5) {
    // Light background - return very dark text
    return '#000000';
  } else {
    // Dark background - return very light text
    return '#ffffff';
  }
};

