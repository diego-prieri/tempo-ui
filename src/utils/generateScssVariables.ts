/**
 * Generate SCSS Variables File
 * 
 * Creates a downloadable SCSS file with all design token variables.
 */

import { getTokens } from '../tokens';

export const generateScssVariables = (): string => {
  const tokens = getTokens();

  const scss = `/**
 * Design Tokens - Generated Variables
 * 
 * This file was generated from the Token Customizer.
 * All text colors should meet AAA accessibility standards.
 * 
 * Generated: ${new Date().toISOString()}
 */

// Colors
$color-primary: ${tokens.colors.primary};
$color-secondary: ${tokens.colors.secondary};
$color-accent: ${tokens.colors.accent};

// Text colors
$color-text-primary: ${tokens.colors.text.primary}; // Dark text for light backgrounds
$color-text-secondary: ${tokens.colors.text.secondary}; // Secondary text
$color-text-inverse: ${tokens.colors.text.inverse}; // Light text for dark backgrounds
$color-text-on-primary: ${tokens.colors.text.onPrimary}; // Text on primary color
$color-text-on-secondary: ${tokens.colors.text.onSecondary}; // Text on secondary color
$color-text-on-accent: ${tokens.colors.text.onAccent}; // Text on accent color

// Typography
$font-family-primary: ${tokens.typography.fontFamily.primary};

$font-size-xs: ${tokens.typography.fontSize.xs};
$font-size-sm: ${tokens.typography.fontSize.sm};
$font-size-base: ${tokens.typography.fontSize.base};
$font-size-lg: ${tokens.typography.fontSize.lg};
$font-size-xl: ${tokens.typography.fontSize.xl};
$font-size-2xl: ${tokens.typography.fontSize['2xl']};
$font-size-3xl: ${tokens.typography.fontSize['3xl']};
$font-size-4xl: ${tokens.typography.fontSize['4xl']};

$font-weight-light: ${tokens.typography.fontWeight.light};
$font-weight-normal: ${tokens.typography.fontWeight.normal};
$font-weight-medium: ${tokens.typography.fontWeight.medium};
$font-weight-semibold: ${tokens.typography.fontWeight.semibold};
$font-weight-bold: ${tokens.typography.fontWeight.bold};

$line-height-tight: ${tokens.typography.lineHeight.tight};
$line-height-normal: ${tokens.typography.lineHeight.normal};
$line-height-relaxed: ${tokens.typography.lineHeight.relaxed};

// Spacing
$spacing-xs: ${tokens.spacing.xs};
$spacing-sm: ${tokens.spacing.sm};
$spacing-md: ${tokens.spacing.md};
$spacing-lg: ${tokens.spacing.lg};
$spacing-xl: ${tokens.spacing.xl};
$spacing-2xl: ${tokens.spacing['2xl']};
$spacing-3xl: ${tokens.spacing['3xl']};
$spacing-4xl: ${tokens.spacing['4xl']};

// Sizes
$size-xs: ${tokens.sizes.xs};
$size-sm: ${tokens.sizes.sm};
$size-md: ${tokens.sizes.md};
$size-lg: ${tokens.sizes.lg};
$size-xl: ${tokens.sizes.xl};

// Border
$border-radius-sm: 0.25rem;
$border-radius-md: 0.375rem;
$border-radius-lg: 0.5rem;

// Shadows
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
`;

  return scss;
};

/**
 * Downloads the SCSS variables file
 */
export const downloadScssVariables = (): void => {
  const scss = generateScssVariables();
  const blob = new Blob([scss], { type: 'text/scss' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `tempo-ui-variables-${Date.now()}.scss`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

