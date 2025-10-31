import React from 'react';
import { getTokens } from '../../tokens';
import styles from './Select.module.scss';
import clsx from 'clsx';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /**
   * The label for the select
   */
  label?: string;
  /**
   * Helper text displayed below the select
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * The size of the select
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the select is required
   */
  required?: boolean;
  /**
   * Options for the select (alternative to children)
   */
  options?: SelectOption[];
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  helperText,
  error,
  size = 'md',
  required = false,
  options,
  placeholder,
  className,
  id,
  children,
  ...props
}) => {
  const tokens = getTokens();
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);

  const selectStyle: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.primary,
    fontSize: tokens.typography.fontSize[size === 'sm' ? 'sm' : size === 'md' ? 'base' : 'lg'],
    padding: `0.5rem ${tokens.spacing.md}`,
    minHeight: tokens.sizes[size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'],
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={selectId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-label="required">*</span>}
        </label>
      )}
      <div className={styles.selectWrapper}>
        <select
          id={selectId}
          className={clsx(
            styles.select,
            styles[`size-${size}`],
            hasError && styles.error,
            className
          )}
          style={selectStyle}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
          }
          required={required}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((option) => (
                <option key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </option>
              ))
            : children}
        </select>
      </div>
      {error && (
        <span id={`${selectId}-error`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${selectId}-helper`} className={styles.helperText}>
          {helperText}
        </span>
      )}
    </div>
  );
};

Select.displayName = 'Select';
