import { render, screen } from '@testing-library/react';
import { FormField } from '.';

describe('FormField', () => {
  it('renders label, description and error correctly', () => {
    const { rerender } = render(
      <FormField label="Name" description="Your full name" />
    );
    expect(screen.getAllByText(/your full name/i)[0]).toBeInTheDocument();
    rerender(<FormField label="Name" error="Required" />);
    expect(screen.getByText(/required/i)).toBeInTheDocument();
  });

  it('handles required and className', () => {
    render(<FormField label="Email" required className="custom-class" />);
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});


