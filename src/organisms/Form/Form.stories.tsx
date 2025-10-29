import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Form } from './Form';
import type { FormFieldConfig } from './Form';

const meta: Meta<typeof Form> = {
  title: 'Organisms/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A complete form component built with FormField molecules. Handles field state, validation, and submission.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Form>;

const defaultFields: FormFieldConfig[] = [
  {
    id: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    required: true,
  },
  {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    description: 'We will never share your email with anyone.',
    required: true,
  },
  {
    id: 'message',
    label: 'Message',
    type: 'text',
    placeholder: 'Enter your message',
    description: 'Please provide as much detail as possible.',
  },
];

export const Default: Story = {
  args: {
    title: 'Contact Us',
    description: 'Fill out the form below and we will get back to you as soon as possible.',
    fields: defaultFields,
    onSubmit: (values) => {
      alert(`Form submitted with values: ${JSON.stringify(values, null, 2)}`);
    },
  },
};

export const Registration: Story = {
  args: {
    title: 'Create Account',
    description: 'Join us today! Create your account in just a few steps.',
    fields: [
      {
        id: 'username',
        label: 'Username',
        type: 'text',
        placeholder: 'Choose a username',
        description: 'Must be at least 3 characters long',
        required: true,
      },
      {
        id: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'your@email.com',
        required: true,
      },
      {
        id: 'password',
        label: 'Password',
        type: 'password',
        placeholder: 'Create a password',
        description: 'Must be at least 8 characters with uppercase, lowercase, and numbers',
        required: true,
      },
      {
        id: 'confirmPassword',
        label: 'Confirm Password',
        type: 'password',
        placeholder: 'Confirm your password',
        required: true,
      },
    ],
    submitLabel: 'Create Account',
    onSubmit: (values) => {
      console.log('Registration:', values);
    },
  },
};

export const WithValidation: Story = {
  render: () => {
    const [fields, setFields] = React.useState<FormFieldConfig[]>([
      {
        id: 'email',
        label: 'Email',
        type: 'email',
        placeholder: 'Enter your email',
        required: true,
      },
    ]);

    const handleFieldChange = (fieldId: string, value: string) => {
      setFields((prev) =>
        prev.map((field) => {
          if (field.id === fieldId) {
            const error =
              field.type === 'email' && value && !value.includes('@')
                ? 'Please enter a valid email address'
                : undefined;
            return { ...field, error };
          }
          return field;
        })
      );
    };

    return (
      <Form
        title="Email Subscription"
        description="Enter your email to subscribe to our newsletter."
        fields={fields}
        onFieldChange={handleFieldChange}
        onSubmit={(values) => alert(`Subscribed: ${values.email}`)}
        submitLabel="Subscribe"
      />
    );
  },
};

export const WithCancel: Story = {
  args: {
    title: 'Edit Profile',
    fields: [
      {
        id: 'name',
        label: 'Name',
        type: 'text',
        value: 'John Doe',
      },
      {
        id: 'bio',
        label: 'Bio',
        type: 'text',
        description: 'Tell us about yourself',
        value: 'Software developer and designer',
      },
    ],
    submitLabel: 'Save Changes',
    cancelLabel: 'Cancel',
    onCancel: () => alert('Changes cancelled'),
    onSubmit: (values) => alert(`Saved: ${JSON.stringify(values)}`),
  },
};

export const Loading: Story = {
  args: {
    title: 'Submit Request',
    fields: defaultFields,
    loading: true,
    onSubmit: () => {},
  },
};

