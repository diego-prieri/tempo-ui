import React from 'react';
import { getTokens } from '../../tokens';
import styles from './Textarea.module.scss';
import clsx from 'clsx';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * The label for the textarea
   */
  label?: string;
  /**
   * Helper text displayed below the textarea
   */
  helperText?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * The size of the textarea
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Whether the textarea is required
   */
  required?: boolean;
  /**
   * Number of rows (default: 4)
   */
  rows?: number;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  helperText,
  error,
  size = 'md',
  required = false,
  rows = 4,
  className,
  id,
  ...props
}) => {
  const tokens = getTokens();
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error);

  const textareaStyle: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.primary,
    fontSize: tokens.typography.fontSize[size === 'sm' ? 'sm' : size === 'md' ? 'base' : 'lg'],
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    minHeight: `calc(${tokens.sizes[size === 'sm' ? 'sm' : size === 'md' ? 'md' : 'lg']} * ${rows * 0.5})`,
  };

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={textareaId} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-label="required">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        rows={rows}
        className={clsx(
          styles.textarea,
          styles[`size-${size}`],
          hasError && styles.error,
          className
        )}
        style={textareaStyle}
        aria-invalid={hasError}
        aria-describedby={
          error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
        }
        required={required}
        {...props}
      />
      {error && (
        <span id={`${textareaId}-error`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
      {helperText && !error && (
        <span id={`${textareaId}-helper`} className={styles.helperText}>
          {helperText}
        </span>
      )}
    </div>
  );
};

Textarea.displayName = 'Textarea';
