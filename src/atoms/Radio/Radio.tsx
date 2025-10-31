import React from 'react';
import { getTokens } from '../../tokens';
import styles from './Radio.module.scss';
import clsx from 'clsx';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /**
   * The label for the radio button
   */
  label?: string;
  /**
   * Helper text displayed below the radio button
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * The size of the radio button
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the radio button is required
   */
  required?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({
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
  const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);

  const radioStyle: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.primary,
    fontSize: tokens.typography.fontSize[size === 'sm' ? 'sm' : size === 'md' ? 'base' : 'lg'],
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.radioWrapper}>
        <input
          type="radio"
          id={radioId}
          className={clsx(
            styles.radio,
            styles[`size-${size}`],
            hasError && styles.error
          )}
          style={radioStyle}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${radioId}-error` : helperText ? `${radioId}-helper` : undefined
          }
          required={required}
          {...props}
        />
        {label && (
          <label htmlFor={radioId} className={styles.label}>
            {label}
            {required && <span className={styles.required} aria-label="required">*</span>}
          </label>
        )}
      </div>
      {error && (
        <span id={`${radioId}-error`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${radioId}-helper`} className={styles.helperText}>
          {helperText}
        </span>
      )}
    </div>
  );
};

Radio.displayName = 'Radio';
