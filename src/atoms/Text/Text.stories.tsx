import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible text component that supports multiple variants, sizes, and semantic HTML tags.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['body', 'heading', 'caption', 'label'],
      description: 'The visual variant of the text',
    },
    as: {
      control: 'select',
      options: ['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'],
      description: 'The HTML tag to render',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl'],
      description: 'The size of the text',
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: 'The font weight',
    },
    children: {
      control: 'text',
      description: 'The text content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'This is body text. It is used for regular paragraph content.',
  },
};

export const Heading: Story = {
  args: {
    variant: 'heading',
    children: 'This is a heading',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'This is caption text, typically used for secondary information.',
  },
};

export const Label: Story = {
  args: {
    variant: 'label',
    children: 'This is a label',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text size="xs">Extra Small Text (xs)</Text>
      <Text size="sm">Small Text (sm)</Text>
      <Text size="base">Base Text (base)</Text>
      <Text size="lg">Large Text (lg)</Text>
      <Text size="xl">Extra Large Text (xl)</Text>
      <Text size="2xl">2XL Text</Text>
      <Text size="3xl">3XL Text</Text>
      <Text size="4xl">4XL Text</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text weight="light">Light weight text</Text>
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="semibold">Semibold weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
  ),
};

export const SemanticTags: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Text as="h1" variant="heading">Heading 1</Text>
      <Text as="h2" variant="heading">Heading 2</Text>
      <Text as="h3" variant="heading">Heading 3</Text>
      <Text as="p" variant="body">Paragraph text</Text>
      <Text as="span" variant="caption">Span text</Text>
    </div>
  ),
};

export const HeadingSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <Text variant="heading" size="4xl" as="h1">
        Main Heading (4xl)
      </Text>
      <Text variant="heading" size="3xl" as="h2">
        Section Heading (3xl)
      </Text>
      <Text variant="heading" size="2xl" as="h3">
        Subsection Heading (2xl)
      </Text>
      <Text variant="heading" size="xl" as="h4">
        Sub-subsection Heading (xl)
      </Text>
    </div>
  ),
};

