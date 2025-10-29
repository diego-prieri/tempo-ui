# Project Structure

This document describes the structure of the Tempo UI component library.

## Directory Structure

```
tempo-ui/
├── .storybook/              # Storybook configuration
│   ├── main.ts              # Main Storybook config
│   └── preview.tsx          # Storybook preview configuration
├── src/
│   ├── atoms/               # Atomic components (Button, Input, Text)
│   │   ├── Button/
│   │   ├── Input/
│   │   └── Text/
│   ├── tokens/              # Design Tokens system
│   │   ├── colors.ts        # Color tokens
│   │   ├── typography.ts   # Typography tokens
│   │   ├── spacing.ts      # Spacing tokens
│   │   ├── sizes.ts        # Component size tokens
│   │   └── index.ts        # Token management system
│   ├── TokenCustomizer/     # Token customization UI
│   ├── styles/              # Global styles
│   │   └── global.css      # Base styles and CSS variables
│   └── index.ts            # Library entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Components

### Atoms

1. **Button** - Versatile button component with multiple variants and sizes
   - Variants: primary, secondary, accent, outline, ghost
   - Sizes: xs, sm, md, lg, xl
   - States: loading, disabled
   - Fully accessible with ARIA attributes

2. **Input** - Accessible form input component
   - Sizes: sm, md, lg
   - Features: label, helper text, error states
   - Proper ARIA attributes and semantic HTML

3. **Text** - Flexible text component
   - Variants: body, heading, caption, label
   - Supports semantic HTML tags
   - Multiple sizes and weights

## Design Tokens

The library uses a centralized Design Token system:

- **Colors**: Primary, Secondary, Accent (customizable)
- **Typography**: Font families, sizes, weights, line heights
- **Spacing**: Modular spacing scale
- **Sizes**: Standard component sizes

## Token Customizer

The Token Customizer (available in Storybook) allows:

- Interactive color picker for 3 main colors
- Google Fonts selector (Montserrat, Open Sans, Lato, Roboto, etc.)
- Real-time preview of components
- Reset to defaults

## Running the Project

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Build the library
npm run build

# Type checking
npm run type-check
```

## Storybook Stories

All components have comprehensive stories demonstrating:

- All variants and sizes
- Different states (loading, disabled, error)
- Accessibility features
- Usage examples

Access the Token Customizer from Storybook's sidebar to customize the design system.

