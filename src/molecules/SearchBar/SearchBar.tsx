import React from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import styles from './SearchBar.module.scss';
import clsx from 'clsx';

export interface SearchBarProps {
  /**
   * Placeholder text for the search input
   */
  placeholder?: string;
  /**
   * Current search value
   */
  value?: string;
  /**
   * Callback when search value changes
   */
  onChange?: (value: string) => void;
  /**
   * Callback when search is submitted
   */
  onSubmit?: (value: string) => void;
  /**
   * Label for the search input (accessibility)
   */
  label?: string;
  /**
   * Size of the search bar
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the search bar is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value = '',
  onChange,
  onSubmit,
  label = 'Search',
  size = 'md',
  disabled = false,
  className,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit && value) {
      onSubmit(value);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <form
      className={clsx(styles.searchBar, className)}
      onSubmit={handleSubmit}
      role="search"
      aria-label={label}
    >
      <div className={styles.inputWrapper}>
        <Input
          type="search"
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          size={size}
          disabled={disabled}
          className={styles.input}
          aria-label={label}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size={size}
        disabled={disabled || !value}
        className={styles.button}
        aria-label="Submit search"
      >
        Search
      </Button>
    </form>
  );
};

SearchBar.displayName = 'SearchBar';
