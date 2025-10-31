import React from 'react';
import { getTokens } from '../../tokens';
import styles from './Checkbox.module.scss';
import clsx from 'clsx';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * The label for the checkbox
   */
  label?: string;
  /**
   * Helper text displayed below the checkbox
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * The size of the checkbox
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the checkbox is required
   */
  required?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
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
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);

  const checkboxStyle: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.primary,
    fontSize: tokens.typography.fontSize[size === 'sm' ? 'sm' : size === 'md' ? 'base' : 'lg'],
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.checkboxWrapper}>
        <input
          type="checkbox"
          id={checkboxId}
          className={clsx(
            styles.checkbox,
            styles[`size-${size}`],
            hasError && styles.error
          )}
          style={checkboxStyle}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${checkboxId}-error` : helperText ? `${checkboxId}-helper` : undefined
          }
          required={required}
          {...props}
        />
        {label && (
          <label htmlFor={checkboxId} className={styles.label}>
            {label}
            {required && <span className={styles.required} aria-label="required">*</span>}
          </label>
        )}
      </div>
      {error && (
        <span id={`${checkboxId}-error`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${checkboxId}-helper`} className={styles.helperText}>
          {helperText}
        </span>
      )}
    </div>
  );
};

Checkbox.displayName = 'Checkbox';
