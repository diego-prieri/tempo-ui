import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';
import { useState } from 'react';

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'An accessible textarea component with label, helper text, and error states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'The label for the textarea',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the textarea',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the textarea',
    },
    rows: {
      control: 'number',
      description: 'Number of rows',
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    rows: 4,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Description',
    placeholder: 'Tell us about yourself...',
    helperText: 'This information will be displayed on your profile',
    rows: 5,
  },
};

export const WithError: Story = {
  args: {
    label: 'Comment',
    placeholder: 'Write a comment...',
    error: 'Comment must be at least 10 characters',
    rows: 4,
  },
};

export const Required: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Please provide your feedback...',
    required: true,
    rows: 4,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Textarea label="Small" size="sm" placeholder="Small textarea" rows={3} />
      <Textarea label="Medium" size="md" placeholder="Medium textarea" rows={4} />
      <Textarea label="Large" size="lg" placeholder="Large textarea" rows={5} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'Cannot edit this...',
    disabled: true,
    value: 'This textarea is disabled',
    rows: 4,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const charCount = value.length;
    const maxChars = 200;
    return (
      <Textarea
        label="Controlled Textarea"
        placeholder="Type something..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={5}
        helperText={`${charCount}/${maxChars} characters`}
      />
    );
  },
};

export const DifferentRows: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Textarea label="Small (3 rows)" rows={3} placeholder="3 rows" />
      <Textarea label="Medium (5 rows)" rows={5} placeholder="5 rows" />
      <Textarea label="Large (7 rows)" rows={7} placeholder="7 rows" />
    </div>
  ),
};

