import React from 'react';
import { getTokens } from '../../tokens';
import styles from './Input.module.scss';
import clsx from 'clsx';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * The label for the input
   */
  label?: string;
  /**
   * Helper text displayed below the input
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * The size of the input
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the input is required
   */
  required?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  size = 'md',
  required = false,
  className,
  id,
  ...props
}) => {
  const tokens = getTokens();
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);

  const inputStyle: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.primary,
    fontSize: tokens.typography.fontSize[size === 'sm' ? 'sm' : size === 'md' ? 'base' : 'lg'],
    padding: `0.5rem ${tokens.spacing.md}`,
    minHeight: tokens.sizes[size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg'],
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-label="required">*</span>}
        </label>
      )}
      <input
        id={inputId}
        className={clsx(
          styles.input,
          styles[`size-${size}`],
          hasError && styles.error,
          className
        )}
        style={inputStyle}
        aria-invalid={hasError}
        aria-describedby={
          error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
        }
        required={required}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${inputId}-helper`} className={styles.helperText}>
          {helperText}
        </span>
      )}
    </div>
  );
};

Input.displayName = 'Input';

