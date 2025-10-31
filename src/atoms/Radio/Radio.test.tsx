import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from '.';

describe('Radio', () => {
  it('renders with label', () => {
    render(<Radio label="Option 1" name="test" />);
    expect(screen.getByLabelText(/option 1/i)).toBeInTheDocument();
  });

  it('handles checked state', () => {
    const onChange = vi.fn();
    render(<Radio label="Option" name="test" onChange={onChange} />);
    const radio = screen.getByLabelText(/option/i);
    fireEvent.click(radio);
    expect(onChange).toHaveBeenCalled();
  });

  it('shows helper text and error', () => {
    const { rerender } = render(<Radio label="Option" name="test" helperText="Additional info" />);
    expect(screen.getByText(/additional info/i)).toBeInTheDocument();
    rerender(<Radio label="Option" name="test" error="Required field" />);
    expect(screen.getByText(/required field/i)).toBeInTheDocument();
    const radio = screen.getByLabelText(/option/i);
    expect(radio).toHaveAttribute('aria-invalid', 'true');
  });

  it('handles different sizes', () => {
    render(
      <div>
        <Radio label="Small" name="test" size="sm" />
        <Radio label="Medium" name="test" size="md" />
        <Radio label="Large" name="test" size="lg" />
      </div>
    );
    expect(screen.getByLabelText(/small/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/medium/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/large/i)).toBeInTheDocument();
  });

  it('handles required and disabled', () => {
    render(<Radio label="Option" name="test" required disabled />);
    const radio = screen.getByRole('radio');
    expect(radio).toBeRequired();
    expect(radio).toBeDisabled();
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
