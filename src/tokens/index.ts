/**
 * Design Tokens - Index
 * 
 * Exports all tokens and provides a centralized management system.
 */

import { ColorTokens, defaultColors } from './colors';
import { TypographyTokens, defaultTypography } from './typography';
import { SpacingTokens, defaultSpacing } from './spacing';
import { SizeTokens, defaultSizes } from './sizes';

export interface DesignTokens {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  sizes: SizeTokens;
}

export const defaultTokens: DesignTokens = {
  colors: defaultColors,
  typography: defaultTypography,
  spacing: defaultSpacing,
  sizes: defaultSizes,
};

// Global context for tokens (can be customized)
let currentTokens: DesignTokens = defaultTokens;

export const setTokens = (tokens: Partial<DesignTokens>): void => {
  currentTokens = {
    ...currentTokens,
    ...tokens,
    colors: { 
      ...currentTokens.colors, 
      ...tokens.colors,
      text: tokens.colors?.text ? { ...currentTokens.colors.text, ...tokens.colors.text } : currentTokens.colors.text,
    },
    typography: { ...currentTokens.typography, ...tokens.typography },
    spacing: { ...currentTokens.spacing, ...tokens.spacing },
    sizes: { ...currentTokens.sizes, ...tokens.sizes },
  };
};

export const getTokens = (): DesignTokens => {
  return currentTokens;
};

export const resetTokens = (): void => {
  currentTokens = defaultTokens;
};

// Individual exports
export { defaultColors, type ColorTokens } from './colors';
export { defaultTypography, googleFonts, type TypographyTokens, type GoogleFont } from './typography';
export { defaultSpacing, type SpacingTokens } from './spacing';
export { defaultSizes, type SizeTokens } from './sizes';

