import type { Meta, StoryObj } from '@storybook/react';
import { CardList } from './CardList';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import type { CardItem } from './CardList';

const meta: Meta<typeof CardList> = {
  title: 'Organisms/CardList',
  component: CardList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A grid layout component displaying multiple cards. Built using Card molecules.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CardList>;

const sampleCards: CardItem[] = [
  {
    id: '1',
    title: 'Feature One',
    subtitle: 'Premium Feature',
    content: (
      <Text variant="body">
        This is a description of the first feature. It provides value to users.
      </Text>
    ),
    footer: <Button variant="primary" size="sm">Learn More</Button>,
  },
  {
    id: '2',
    title: 'Feature Two',
    subtitle: 'Standard Feature',
    content: (
      <Text variant="body">
        This is another feature description. It showcases different capabilities.
      </Text>
    ),
    footer: <Button variant="outline" size="sm">Explore</Button>,
  },
  {
    id: '3',
    title: 'Feature Three',
    subtitle: 'New Feature',
    content: (
      <Text variant="body">
        A third feature with its own description and unique characteristics.
      </Text>
    ),
    footer: <Button variant="accent" size="sm">Try Now</Button>,
  },
];

export const Default: Story = {
  args: {
    title: 'Our Features',
    description: 'Discover what makes our platform unique.',
    cards: sampleCards,
    columns: 3,
  },
};

export const TwoColumns: Story = {
  args: {
    title: 'Product Categories',
    cards: sampleCards,
    columns: 2,
  },
};

export const FourColumns: Story = {
  args: {
    title: 'Services',
    cards: [
      ...sampleCards,
      {
        id: '4',
        title: 'Feature Four',
        subtitle: 'Special Feature',
        content: <Text variant="body">Fourth feature card in the grid.</Text>,
        footer: <Button variant="ghost" size="sm">Details</Button>,
      },
    ],
    columns: 4,
  },
};

export const Interactive: Story = {
  args: {
    title: 'Select a Plan',
    description: 'Choose the plan that best fits your needs.',
    cards: sampleCards.map((card) => ({
      ...card,
      onClick: () => alert(`Selected: ${card.title}`),
    })),
    columns: 3,
    interactive: true,
  },
};

export const SingleColumn: Story = {
  args: {
    title: 'Blog Posts',
    cards: sampleCards.map((card, index) => ({
      ...card,
      subtitle: `Published ${index + 1} days ago`,
      footer: <Button variant="ghost" size="sm">Read More →</Button>,
    })),
    columns: 1,
  },
};

export const WithoutHeaders: Story = {
  args: {
    cards: sampleCards,
    columns: 3,
  },
};

