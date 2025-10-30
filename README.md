# Tempo UI

React UI component library built with Atomic Design, focused on accessibility (A11Y) and customization through Design Tokens. Built with TypeScript, SCSS Modules, and comprehensive testing.

## Features

- 🎨 **Atomic Design**: Organized structure with atoms, molecules, and organisms
- ♿ **Accessibility**: Designed with A11Y from conception (WCAG 2.1 AAA compliant)
- 🎯 **TypeScript**: Strict typing for better DX
- 🎨 **SCSS Modules**: Encapsulated and modular styles with design tokens
- 🏗️ **Design Tokens**: Centralized and customizable design system
- 📚 **Storybook**: Interactive component development and documentation
- 🧪 **Testing**: 100% test coverage with Vitest and React Testing Library
- 🎨 **Token Customizer**: Interactive design token customization tool
- 🌈 **Color Contrast**: Built-in WCAG 2.1 AAA color contrast evaluation

## Installation

```bash
yarn install
```

## Development

```bash
# Run Storybook
yarn storybook

# Build the project
yarn build

# Type checking
yarn type-check

# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate coverage report
yarn coverage
```

## Project Structure

```
src/
├── tokens/              # Design Tokens (colors, typography, spacing, sizes)
│   ├── colors.ts        # Color tokens with AAA compliant text colors
│   ├── typography.ts    # Typography tokens and Google Fonts
│   ├── spacing.ts       # Spacing system
│   ├── sizes.ts         # Component sizes
│   └── index.ts         # Token management and utilities
├── atoms/               # Atomic components
│   ├── Button/          # Button component with variants and states
│   ├── Input/           # Input component with accessibility features
│   └── Text/            # Text component with semantic variants
├── molecules/           # Molecular components
│   ├── SearchBar/       # Search input with button
│   ├── FormField/       # Complete form field with label and error
│   └── Card/            # Flexible card layout component
├── organisms/           # Organism components
│   ├── Header/          # Page header with navigation
│   ├── Form/            # Complete form management
│   └── CardList/        # Responsive card grid
├── TokenCustomizer/     # Interactive design token customization
├── utils/               # Utility functions
│   ├── colorContrast.ts # WCAG 2.1 color contrast evaluation
│   └── generateScssVariables.ts # SCSS variable generation
├── styles/              # Global styles and SCSS utilities
│   ├── _variables.scss  # SCSS design token variables
│   └── global.scss      # Global styles
└── types/               # TypeScript type definitions
    └── scss-modules.d.ts # SCSS module type definitions
```

## Usage

```tsx
import { Button, Input, Text, TokenCustomizer } from 'tempo-ui';

function App() {
  return (
    <div>
      <Text variant="heading">Welcome to Tempo UI</Text>
      <Input label="Name" placeholder="Enter your name" />
      <Button variant="primary" size="md">Submit</Button>
      
      {/* Interactive Design Token Customizer */}
      <TokenCustomizer />
    </div>
  );
}
```

## Components

### Atoms
- **Button**: Multiple variants (primary, secondary, accent, outline, ghost), sizes, and states
- **Input**: Accessible input with label, helper text, error states, and validation
- **Text**: Semantic text variants (heading, body, caption, label) with different sizes

### Molecules
- **SearchBar**: Search input with submit button and real-time search
- **FormField**: Complete form field with label, description, and error handling
- **Card**: Flexible card layout with title, subtitle, content, and footer

### Organisms
- **Header**: Page header with logo, navigation, search, and action buttons
- **Form**: Complete form management with validation and submission
- **CardList**: Responsive grid of cards with customizable columns

## Design Tokens

The library includes a comprehensive design token system with:

### Colors
- **Primary Colors**: 3 main brand colors with variations
- **Text Colors**: AAA compliant text colors for accessibility
- **Contrast Evaluation**: Built-in WCAG 2.1 AAA color contrast checking

### Typography
- **Font Families**: Google Fonts integration with fallbacks
- **Font Sizes**: Responsive typography scale
- **Font Weights**: Complete weight range
- **Line Heights**: Optimized for readability

### Spacing & Sizes
- **Spacing System**: Modular spacing scale for consistent layouts
- **Component Sizes**: Standardized component dimensions
- **Responsive Breakpoints**: Mobile-first responsive design

## Token Customizer

The interactive Token Customizer allows you to:
- 🎨 **Customize Colors**: Real-time color palette editing
- 🔤 **Change Typography**: Select from popular Google Fonts
- 📏 **Adjust Spacing**: Modify spacing and sizing scales
- ♿ **Test Accessibility**: Real-time contrast ratio evaluation
- 💾 **Download Variables**: Export customized SCSS variables
- 🔄 **Live Preview**: See changes instantly across all components

## Testing

The library includes comprehensive testing with:
- **100% Test Coverage** for all components
- **Vitest** for fast unit testing
- **React Testing Library** for component testing
- **Accessibility Testing** with proper ARIA attributes
- **TypeScript** strict type checking

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate coverage report
yarn coverage
```

## Accessibility (A11Y)

Built with accessibility as a core principle:
- **WCAG 2.1 AAA Compliant** color contrast ratios
- **Semantic HTML** with proper ARIA attributes
- **Keyboard Navigation** support
- **Screen Reader** compatibility
- **Focus Management** for better UX
- **Color Blind** friendly design

## Storybook

Interactive component development and documentation:
- **Component Stories** for all components
- **Interactive Controls** for testing props
- **Accessibility Testing** with addons
- **Design Token Customizer** integration
- **Live Documentation** with examples

