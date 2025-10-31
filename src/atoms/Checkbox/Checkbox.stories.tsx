import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An accessible checkbox component with label, helper text, and error states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the checkbox',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the checkbox',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'I agree to the terms and conditions',
    name: 'terms',
  },
};

export const Checked: Story = {
  args: {
    label: 'Subscribed to newsletter',
    name: 'newsletter',
    checked: true,
  },
};


export const WithHelperText: Story = {
  args: {
    label: 'Enable notifications',
    name: 'notifications',
    helperText: 'You will receive email notifications about your account',
  },
};

export const WithError: Story = {
  args: {
    label: 'Required checkbox',
    name: 'required',
    error: 'Please accept the terms to continue',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Checkbox label="Small" name="size-sm" size="sm" />
      <Checkbox label="Medium" name="size-md" size="md" checked />
      <Checkbox label="Large" name="size-lg" size="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    name: 'disabled',
    disabled: true,
  },
};

export const CheckboxGroup: Story = {
  render: () => {
    const [checked, setChecked] = useState({
      option1: true,
      option2: false,
      option3: false,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Checkbox
          label="Option 1"
          name="option1"
          checked={checked.option1}
          onChange={(e) => setChecked({ ...checked, option1: e.target.checked })}
        />
        <Checkbox
          label="Option 2"
          name="option2"
          checked={checked.option2}
          onChange={(e) => setChecked({ ...checked, option2: e.target.checked })}
        />
        <Checkbox
          label="Option 3"
          name="option3"
          checked={checked.option3}
          onChange={(e) => setChecked({ ...checked, option3: e.target.checked })}
        />
      </div>
    );
  },
};

