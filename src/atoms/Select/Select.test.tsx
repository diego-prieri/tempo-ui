import { render, screen, fireEvent } from '@testing-library/react';
import { Select } from '.';

describe('Select', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders with label and options', () => {
    render(<Select label="Choose option" options={options} />);
    expect(screen.getByLabelText(/choose option/i)).toBeInTheDocument();
    expect(screen.getByText(/option 1/i)).toBeInTheDocument();
    expect(screen.getByText(/option 2/i)).toBeInTheDocument();
  });

  it('handles value change', () => {
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'option2' } });
    expect(onChange).toHaveBeenCalled();
  });

  it('shows helper text and error', () => {
    const { rerender } = render(<Select label="Select" options={options} helperText="Additional info" />);
    expect(screen.getByText(/additional info/i)).toBeInTheDocument();
    rerender(<Select label="Select" options={options} error="Required field" />);
    expect(screen.getByText(/required field/i)).toBeInTheDocument();
    const select = screen.getByLabelText(/select/i);
    expect(select).toHaveAttribute('aria-invalid', 'true');
  });

  it('handles placeholder', () => {
    render(<Select label="Select" options={options} placeholder="Choose an option" />);
    expect(screen.getByText(/choose an option/i)).toBeInTheDocument();
  });

  it('handles different sizes', () => {
    render(
      <div>
        <Select label="Small" options={options} size="sm" />
        <Select label="Medium" options={options} size="md" />
        <Select label="Large" options={options} size="lg" />
      </div>
    );
    expect(screen.getByLabelText(/small/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/medium/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/large/i)).toBeInTheDocument();
  });

  it('handles required and disabled', () => {
    render(<Select label="Option" options={options} required disabled />);
    const select = screen.getByRole('combobox');
    expect(select).toBeRequired();
    expect(select).toBeDisabled();
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders with children instead of options', () => {
    render(
      <Select label="Select">
        <option value="1">One</option>
        <option value="2">Two</option>
      </Select>
    );
    expect(screen.getByText(/one/i)).toBeInTheDocument();
    expect(screen.getByText(/two/i)).toBeInTheDocument();
  });
});
