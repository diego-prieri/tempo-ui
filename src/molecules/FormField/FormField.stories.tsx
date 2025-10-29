import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta: Meta<typeof FormField> = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An enhanced form field combining Input and Text atoms with label, description, and error handling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label for the form field',
    },
    description: {
      control: 'text',
      description: 'Description or helper text',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Username',
    description: 'Choose a unique username. This will be visible to other users.',
    placeholder: 'Enter username',
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter password',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    value: 'invalid-email',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
      <FormField label="Default Field" placeholder="Enter text" />
      <FormField
        label="With Description"
        description="This is a helpful description"
        placeholder="Enter text"
      />
      <FormField label="Required Field" required placeholder="This field is required" />
      <FormField
        label="Error State"
        error="This field is required"
        placeholder="Enter text"
      />
    </div>
  ),
};

