import { render, screen } from '@testing-library/react';
import { Header } from '.';

describe('Header', () => {
  it('renders without failing', () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom props', () => {
    render(<Header className="custom-header" />);
    expect(screen.getByRole('banner')).toHaveClass('custom-header');
  });
});


