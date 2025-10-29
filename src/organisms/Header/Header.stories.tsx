import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import { useState } from 'react';

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A complete header component combining logo, navigation, search, and action buttons. Built using atoms and molecules.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    logo: <Text variant="heading" size="xl">Tempo UI</Text>,
    navigation: [
      { label: 'Home', href: '#' },
      { label: 'Products', href: '#' },
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    actions: (
      <>
        <Button variant="ghost" size="sm">Sign In</Button>
        <Button variant="primary" size="sm">Sign Up</Button>
      </>
    ),
  },
};

export const WithSearch: Story = {
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    return (
      <Header
        logo={<Text variant="heading" size="xl">MyApp</Text>}
        navigation={[
          { label: 'Home', href: '#' },
          { label: 'Products', href: '#' },
          { label: 'Solutions', href: '#' },
        ]}
        search={{
          placeholder: 'Search products...',
          value: searchValue,
          onChange: setSearchValue,
          onSubmit: (val) => alert(`Searching for: ${val}`),
        }}
        actions={
          <Button variant="primary" size="sm">Get Started</Button>
        }
      />
    );
  },
};

export const Minimal: Story = {
  args: {
    logo: <Text variant="heading" size="lg">Logo</Text>,
    actions: <Button variant="primary" size="sm">Action</Button>,
  },
};

export const WithLongNavigation: Story = {
  args: {
    logo: <Text variant="heading" size="xl">Company</Text>,
    navigation: [
      { label: 'Home', href: '#' },
      { label: 'Products', href: '#' },
      { label: 'Services', href: '#' },
      { label: 'Solutions', href: '#' },
      { label: 'Resources', href: '#' },
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
    ],
    actions: (
      <>
        <Button variant="outline" size="sm">Login</Button>
        <Button variant="primary" size="sm">Try Free</Button>
      </>
    ),
  },
};

