import { render, screen } from '@testing-library/react';
import { Text } from '.';

describe('Text', () => {
  it('renders different variants and sizes', () => {
    render(
      <div>
        <Text variant="heading" size="xl">Heading</Text>
        <Text variant="body" size="base">Body</Text>
        <Text variant="caption">Caption</Text>
        <Text variant="label">Label</Text>
      </div>
    );
    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Caption')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Text className="custom-class">Test</Text>);
    expect(screen.getByText('Test')).toHaveClass('custom-class');
  });

  it('renders with different HTML elements', () => {
    render(
      <div>
        <Text as="h1">H1</Text>
        <Text as="h2">H2</Text>
        <Text as="p">P</Text>
        <Text as="span">Span</Text>
      </div>
    );
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });
});


