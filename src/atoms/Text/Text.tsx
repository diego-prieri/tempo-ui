import React from 'react';
import { getTokens } from '../../tokens';
import styles from './Text.module.scss';
import clsx from 'clsx';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The visual variant of the text
   */
  variant?: 'body' | 'heading' | 'caption' | 'label';
  /**
   * The HTML tag to render
   */
  as?: 'p' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div';
  /**
   * The size of the text
   */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  /**
   * The font weight
   */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  /**
   * Additional CSS class name
   */
  className?: string;
  /**
   * The text content
   */
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  as,
  size = 'base',
  weight = 'normal',
  className,
  children,
  ...props
}) => {
  const tokens = getTokens();
  
  // Determine the element to render
  const Component = as || (variant === 'heading' ? 'h1' : 'p');

  const textStyle: React.CSSProperties = {
    fontFamily: tokens.typography.fontFamily.primary,
    fontSize: tokens.typography.fontSize[size],
    fontWeight: tokens.typography.fontWeight[weight],
  };

  return (
    <Component
      className={clsx(
        styles.text,
        styles[`variant-${variant}`],
        styles[`size-${size}`],
        className
      )}
      style={textStyle}
      {...props}
    >
      {children}
    </Component>
  );
};

Text.displayName = 'Text';

