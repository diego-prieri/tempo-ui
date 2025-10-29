import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';
import { useState } from 'react';

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A search bar component combining Input and Button atoms. Provides search functionality with form submission and accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the search bar',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the search bar is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: '400px' }}>
        <SearchBar
          value={value}
          onChange={setValue}
          onSubmit={(val) => alert(`Searching for: ${val}`)}
          placeholder="Search products..."
        />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
          Current value: {value || '(empty)'}
        </p>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <SearchBar placeholder="Small search" size="sm" />
      <SearchBar placeholder="Medium search" size="md" />
      <SearchBar placeholder="Large search" size="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    placeholder: 'Search...',
    disabled: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Product Search',
    placeholder: 'Enter product name...',
  },
};
