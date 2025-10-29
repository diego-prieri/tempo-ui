import React from 'react';
import { getTokens } from '../../tokens';
import styles from './Button.module.scss';
import clsx from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The visual variant of the button
   */
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  /**
   * The size of the button
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Whether the button is in a loading state
   */
  loading?: boolean;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * The button content
   */
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className,
  children,
  ...props
}) => {
  const tokens = getTokens();

  const buttonStyle: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.primary,
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.medium,
    padding: `0.5rem ${tokens.spacing.md}`,
    minHeight: tokens.sizes[size === 'xs' ? 'xs' : size === 'sm' ? 'sm' : size === 'md' ? 'md' : size === 'lg' ? 'lg' : 'xl'],
    backgroundColor: variant === 'primary' ? tokens.colors.primary : 
                     variant === 'secondary' ? tokens.colors.secondary :
                     variant === 'accent' ? tokens.colors.accent : 'transparent',
  };

  return (
    <button
      type="button"
      className={clsx(
        styles.button,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        loading && styles.loading,
        className
      )}
      style={buttonStyle}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : null}
      <span className={loading ? styles.hidden : undefined}>{children}</span>
    </button>
  );
};

Button.displayName = 'Button';

