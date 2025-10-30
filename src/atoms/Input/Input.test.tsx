import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '.';

describe('Input', () => {
  it('renders with label and placeholder', () => {
    render(<Input label="Email" placeholder="your@email.com" />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/your@email.com/i)).toBeInTheDocument();
  });

  it('shows helper text and error', () => {
    const { rerender } = render(<Input label="Name" helperText="We keep it private" />);
    expect(screen.getByText(/keep it private/i)).toBeInTheDocument();
    rerender(<Input label="Name" error="Required" />);
    expect(screen.getByText(/required/i)).toBeInTheDocument();
    const input = screen.getByLabelText(/name/i);
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('triggers onChange', () => {
    const onChange = vi.fn();
    render(<Input label="User" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText(/user/i), { target: { value: 'John' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('handles different types and sizes', () => {
    render(
      <div>
        <Input label="Email" type="email" size="sm" />
        <Input label="Password" type="password" size="lg" />
        <Input label="Text" type="text" size="md" />
      </div>
    );
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
  });

  it('handles required and disabled', () => {
    render(<Input label="Required" required disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
    expect(input).toBeDisabled();
  });
});


