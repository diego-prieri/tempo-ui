import { render, screen, fireEvent } from '@testing-library/react';
import { CardList } from '.';

describe('CardList', () => {
  it('renders items', () => {
    render(
      <CardList
        cards={[
          { id: '1', title: 'A', content: 'C1' },
          { id: '2', title: 'B', content: 'C2' },
        ]}
      />
    );
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('B')).toBeInTheDocument();
  });

  it('renders with title and description', () => {
    render(
      <CardList
        title="Test List"
        description="Test Description"
        cards={[{ id: '1', title: 'Test', content: 'Content' }]}
      />
    );
    expect(screen.getByText('Test List')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('handles onClick and different columns', () => {
    const onClick = vi.fn();
    render(
      <CardList
        cards={[{ id: '1', title: 'Clickable', content: 'Content', onClick }]}
        columns={2}
        interactive
        className="custom-list"
      />
    );
    fireEvent.click(screen.getByText('Clickable'));
    expect(onClick).toHaveBeenCalled();
  });
});


