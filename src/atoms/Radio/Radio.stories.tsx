import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';
import { useState } from 'react';

const meta: Meta<typeof Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An accessible radio button component with label, helper text, and error states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the radio button',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the radio',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the radio button',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the radio is checked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    label: 'Option 1',
    name: 'radio-group',
  },
};

export const Checked: Story = {
  args: {
    label: 'Selected Option',
    name: 'radio-group',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Option with helper',
    name: 'radio-group',
    helperText: 'This is a helpful description',
  },
};

export const WithError: Story = {
  args: {
    label: 'Option with error',
    name: 'radio-group',
    error: 'Please select an option',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Radio label="Small" name="size-group" size="sm" />
      <Radio label="Medium" name="size-group" size="md" checked />
      <Radio label="Large" name="size-group" size="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Option',
    name: 'radio-group',
    disabled: true,
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Radio
          label="Option 1"
          name="group"
          value="option1"
          checked={value === 'option1'}
          onChange={(e) => setValue(e.target.value)}
        />
        <Radio
          label="Option 2"
          name="group"
          value="option2"
          checked={value === 'option2'}
          onChange={(e) => setValue(e.target.value)}
        />
        <Radio
          label="Option 3"
          name="group"
          value="option3"
          checked={value === 'option3'}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    );
  },
};

