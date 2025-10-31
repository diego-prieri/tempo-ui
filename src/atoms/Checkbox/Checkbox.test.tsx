import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '.';

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
  });

  it('handles checked state', () => {
    const onChange = vi.fn();
    render(<Checkbox label="Option" checked onChange={onChange} />);
    const checkbox = screen.getByLabelText(/option/i);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalled();
  });

  it('shows helper text and error', () => {
    const { rerender } = render(<Checkbox label="Option" helperText="Additional info" />);
    expect(screen.getByText(/additional info/i)).toBeInTheDocument();
    rerender(<Checkbox label="Option" error="Required field" />);
    expect(screen.getByText(/required field/i)).toBeInTheDocument();
    const checkbox = screen.getByLabelText(/option/i);
    expect(checkbox).toHaveAttribute('aria-invalid', 'true');
  });

  it('handles different sizes', () => {
    render(
      <div>
        <Checkbox label="Small" size="sm" />
        <Checkbox label="Medium" size="md" />
        <Checkbox label="Large" size="lg" />
      </div>
    );
    expect(screen.getByLabelText(/small/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/medium/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/large/i)).toBeInTheDocument();
  });

  it('handles required and disabled', () => {
    render(<Checkbox label="Option" required disabled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeRequired();
    expect(checkbox).toBeDisabled();
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
