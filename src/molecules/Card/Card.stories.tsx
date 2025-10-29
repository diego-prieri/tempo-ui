import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile card component with header, content, and footer sections. Can be interactive (clickable).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    subtitle: {
      control: 'text',
      description: 'Card subtitle or description',
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card is clickable',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card subtitle or description',
    children: 'This is the card content. You can put anything here.',
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Product Card',
    subtitle: 'Premium Subscription',
    children: (
      <Text variant="body">
        Get access to all premium features including advanced analytics, priority support, and more.
      </Text>
    ),
    footer: (
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
        <Button variant="outline" size="sm">Learn More</Button>
        <Button variant="primary" size="sm">Subscribe</Button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    title: 'Interactive Card',
    subtitle: 'Click to view details',
    children: 'This card is clickable and responds to user interaction.',
    interactive: true,
    onClick: () => alert('Card clicked!'),
  },
};

export const Simple: Story = {
  args: {
    children: (
      <Text variant="body">
        A simple card with just content and no title or subtitle.
      </Text>
    ),
  },
};

export const ContentOnly: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', width: '900px' }}>
      <Card title="Card 1">
        <Text variant="body">Simple card with title and content.</Text>
      </Card>
      <Card title="Card 2" subtitle="With subtitle">
        <Text variant="body">Card with both title and subtitle.</Text>
      </Card>
      <Card>
        <Text variant="body">Card with just content, no header.</Text>
      </Card>
    </div>
  ),
};

