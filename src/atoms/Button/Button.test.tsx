import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '.';

describe('Button', () => {
  it('renders with text and accessible role', () => {
    render(<Button>Click me</Button>);
    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();
  });

  it('triggers onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Press</Button>);
    fireEvent.click(screen.getByRole('button', { name: /press/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state and disables interaction', () => {
    const onClick = vi.fn();
    render(<Button loading onClick={onClick}>Load</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveAttribute('aria-busy', 'true');
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies variants and sizes without breaking render', () => {
    render(
      <div>
        <Button variant="primary">P</Button>
        <Button variant="secondary">S</Button>
        <Button variant="accent">A</Button>
        <Button variant="outline">O</Button>
        <Button variant="ghost">G</Button>
        <Button size="sm">SM</Button>
        <Button size="md">MD</Button>
        <Button size="lg">LG</Button>
      </div>
    );
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });

  it('handles disabled state', () => {
    const onClick = vi.fn();
    render(<Button disabled onClick={onClick}>Disabled</Button>);
    const btn = screen.getByRole('button', { name: /disabled/i });
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    const btn = screen.getByRole('button', { name: /test/i });
    expect(btn).toHaveClass('custom-class');
  });
});


