# Tempo UI

React UI component library built with Atomic Design, focused on accessibility (A11Y) and customization through Design Tokens.

## Features

- 🎨 **Atomic Design**: Organized structure with atoms, molecules, and organisms
- ♿ **Accessibility**: Designed with A11Y from conception
- 🎯 **TypeScript**: Strict typing for better DX
- 🎨 **CSS Modules**: Encapsulated and modular styles
- 🏗️ **Design Tokens**: Centralized and customizable design system
- 📚 **Storybook**: Interactive component development and documentation

## Installation

```bash
npm install
```

## Development

```bash
# Run Storybook
npm run storybook

# Build the project
npm run build

# Type checking
npm run type-check
```

## Project Structure

```
src/
├── tokens/          # Design Tokens (colors, typography, spacing, sizes)
├── atoms/           # Atomic components (Button, Input, Text)
├── molecules/       # Molecular components
├── organisms/       # Organism components
└── styles/          # Global styles and CSS Modules utilities
```

## Usage

```tsx
import { Button, Input, Text } from 'tempo-ui';

function App() {
  return (
    <div>
      <Text variant="heading">Welcome</Text>
      <Input label="Name" />
      <Button variant="primary">Submit</Button>
    </div>
  );
}
```

## Design Tokens

Design Tokens can be customized from Storybook. The library includes tokens for:

- Primary colors (3 main colors)
- Typography (font families, sizes, weights)
- Spacing (margins, padding, gaps)
- Component sizes

