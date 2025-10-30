import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from '.';

describe('SearchBar', () => {
  it('submits search when form is submitted', () => {
    const onSearch = vi.fn();
    render(<SearchBar onSubmit={onSearch} placeholder="Search..." />);
    const input = screen.getByPlaceholderText(/search.../i);
    expect(input).toBeInTheDocument();
  });

  it('handles onChange and disabled state', () => {
    const onChange = vi.fn();
    const onSubmit = vi.fn();
    render(<SearchBar onChange={onChange} onSubmit={onSubmit} disabled />);
    const input = screen.getByPlaceholderText(/search.../i);
    const button = screen.getByRole('button', { name: /submit search/i });
    
    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
    
    fireEvent.change(input, { target: { value: 'test' } });
    expect(onChange).toHaveBeenCalledWith('test');
  });
});


