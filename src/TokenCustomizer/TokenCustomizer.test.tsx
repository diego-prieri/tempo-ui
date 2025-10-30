import { render, screen } from '@testing-library/react';
import { TokenCustomizer } from '.';

describe('TokenCustomizer', () => {
  it('renders main sections', () => {
    render(<TokenCustomizer />);
    expect(screen.getByText(/Design Token Customizer/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Colors/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Typography/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Component Preview/i)).toBeInTheDocument();
  });
});


