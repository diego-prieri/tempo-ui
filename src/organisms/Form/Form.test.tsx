import { render, screen, fireEvent } from '@testing-library/react';
import { Form } from '.';

describe('Form', () => {
  it('renders fields and handles submit', () => {
    const onSubmit = vi.fn();
    render(
      <Form
        onSubmit={onSubmit}
        fields={[
          { id: 'name', label: 'Name', type: 'text', required: true },
          { id: 'email', label: 'Email', type: 'email' },
        ]}
      />
    );
    const nameInput = screen.getAllByDisplayValue('')[0];
    fireEvent.change(nameInput, { target: { value: 'John' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('renders with title and description', () => {
    render(
      <Form
        title="Test Form"
        description="Test Description"
        fields={[{ id: 'test', label: 'Test' }]}
      />
    );
    expect(screen.getByText('Test Form')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('handles cancel and className', () => {
    const onCancel = vi.fn();
    render(
      <Form
        fields={[{ id: 'test', label: 'Test' }]}
        onCancel={onCancel}
        cancelLabel="Cancel"
        className="custom-form"
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    expect(onCancel).toHaveBeenCalled();
  });
});


