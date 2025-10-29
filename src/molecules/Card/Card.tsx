import React from 'react';
import { Text } from '../../atoms/Text';
import styles from './Card.module.scss';
import clsx from 'clsx';

export interface CardProps {
  /**
   * Card title
   */
  title?: string;
  /**
   * Card subtitle or description
   */
  subtitle?: string;
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Footer content
   */
  footer?: React.ReactNode;
  /**
   * Whether the card is interactive (clickable)
   */
  interactive?: boolean;
  /**
   * Click handler for interactive cards
   */
  onClick?: () => void;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  footer,
  interactive = false,
  onClick,
  className,
}) => {
  const Component = interactive ? 'button' : 'div';

  return (
    <Component
      className={clsx(
        styles.card,
        interactive && styles.interactive,
        className
      )}
      onClick={onClick}
      type={interactive ? 'button' : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
    >
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && (
            <Text variant="heading" size="lg" as="h3" className={styles.title}>
              {title}
            </Text>
          )}
          {subtitle && (
            <Text variant="body" size="sm" className={styles.subtitle}>
              {subtitle}
            </Text>
          )}
        </div>
      )}
      <div className={styles.content}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </Component>
  );
};

Card.displayName = 'Card';
