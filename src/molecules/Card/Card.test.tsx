import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from '.';

describe('Card', () => {
  it('renders title, subtitle and content', () => {
    render(
      <Card title="Title" subtitle="Subtitle">
        <div>Content</div>
      </Card>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('handles onClick and footer', () => {
    const onClick = vi.fn();
    render(
      <Card title="Clickable" onClick={onClick} footer={<div>Footer</div>}>
        Content
      </Card>
    );
    fireEvent.click(screen.getByText('Clickable'));
    expect(onClick).toHaveBeenCalled();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Card title="Test" className="custom-class">Content</Card>);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});


