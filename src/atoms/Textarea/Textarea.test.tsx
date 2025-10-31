import { render, screen, fireEvent } from '@testing-library/react';
import { Textarea } from '.';

describe('Textarea', () => {
  it('renders with label', () => {
    render(<Textarea label="Description" />);
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it('handles value change', () => {
    const onChange = vi.fn();
    render(<Textarea label="Description" onChange={onChange} />);
    const textarea = screen.getByLabelText(/description/i);
    fireEvent.change(textarea, { target: { value: 'Test text' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('shows helper text and error', () => {
    const { rerender } = render(<Textarea label="Description" helperText="Additional info" />);
    expect(screen.getByText(/additional info/i)).toBeInTheDocument();
    rerender(<Textarea label="Description" error="Required field" />);
    expect(screen.getByText(/required field/i)).toBeInTheDocument();
    const textarea = screen.getByLabelText(/description/i);
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('handles different sizes', () => {
    render(
      <div>
        <Textarea label="Small" size="sm" />
        <Textarea label="Medium" size="md" />
        <Textarea label="Large" size="lg" />
      </div>
    );
    expect(screen.getByLabelText(/small/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/medium/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/large/i)).toBeInTheDocument();
  });

  it('handles required and disabled', () => {
    render(<Textarea label="Description" required disabled />);
    const textarea = screen.getByLabelText(/description/i);
    expect(textarea).toBeRequired();
    expect(textarea).toBeDisabled();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('handles custom rows', () => {
    render(<Textarea label="Description" rows={6} />);
    const textarea = screen.getByLabelText(/description/i);
    expect(textarea).toHaveAttribute('rows', '6');
  });
});
