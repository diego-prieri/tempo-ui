import type { Meta, StoryObj } from '@storybook/react';
import { TokenCustomizer } from './TokenCustomizer';

const meta: Meta<typeof TokenCustomizer> = {
  title: 'Token Customizer',
  component: TokenCustomizer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Customize Design Tokens and see real-time changes across all components. Adjust colors and typography to see how they affect the component library.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TokenCustomizer>;

export const Default: Story = {};

