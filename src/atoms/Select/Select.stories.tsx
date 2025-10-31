import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';
import { useState } from 'react';

const meta: Meta<typeof Select> = {
  title: 'Atoms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An accessible select/dropdown component with label, helper text, and error states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the select',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the select',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the select',
    },
    required: {
      control: 'boolean',
      description: 'Whether the select is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

export const Default: Story = {
  args: {
    label: 'Choose an option',
    placeholder: 'Select an option...',
    options: sampleOptions,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country...',
    helperText: 'Please select your country of residence',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico' },
    ],
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country...',
    error: 'Please select a country',
    options: sampleOptions,
  },
};

export const Required: Story = {
  args: {
    label: 'Language',
    placeholder: 'Select a language...',
    required: true,
    options: [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '250px' }}>
      <Select label="Small" size="sm" placeholder="Small select" options={sampleOptions} />
      <Select label="Medium" size="md" placeholder="Medium select" options={sampleOptions} />
      <Select label="Large" size="lg" placeholder="Large select" options={sampleOptions} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    placeholder: 'Cannot select...',
    disabled: true,
    options: sampleOptions,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select
        label="Controlled Select"
        placeholder="Select an option..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText={`Selected: ${value || 'none'}`}
        options={sampleOptions}
      />
    );
  },
};

export const WithChildren: Story = {
  render: () => (
    <Select label="Custom Options">
      <option value="">Select...</option>
      <option value="1">First Option</option>
      <option value="2">Second Option</option>
      <option value="3">Third Option</option>
    </Select>
  ),
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Select with disabled options',
    placeholder: 'Choose...',
    options: [
      { value: 'option1', label: 'Available Option 1' },
      { value: 'option2', label: 'Disabled Option', disabled: true },
      { value: 'option3', label: 'Available Option 2' },
      { value: 'option4', label: 'Another Disabled', disabled: true },
    ],
  },
};

