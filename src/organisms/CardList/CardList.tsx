import React from 'react';
import { Card } from '../../molecules/Card';
import { Text } from '../../atoms/Text';
import styles from './CardList.module.scss';
import clsx from 'clsx';

export interface CardItem {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
}

export interface CardListProps {
  /**
   * List title
   */
  title?: string;
  /**
   * List description
   */
  description?: string;
  /**
   * Array of card items
   */
  cards: CardItem[];
  /**
   * Number of columns (responsive)
   */
  columns?: 1 | 2 | 3 | 4;
  /**
   * Whether cards are interactive
   */
  interactive?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const CardList: React.FC<CardListProps> = ({
  title,
  description,
  cards,
  columns = 3,
  interactive = false,
  className,
}) => {
  return (
    <section className={clsx(styles.cardList, className)}>
      {(title || description) && (
        <div className={styles.header}>
          {title && (
            <Text variant="heading" size="2xl" as="h2" className={styles.title}>
              {title}
            </Text>
          )}
          {description && (
            <Text variant="body" size="base" className={styles.description}>
              {description}
            </Text>
          )}
        </div>
      )}

      <div
        className={clsx(
          styles.grid,
          styles[`columns-${columns}`]
        )}
        role="list"
      >
        {cards.map((card) => (
          <div key={card.id} role="listitem">
            <Card
              title={card.title}
              subtitle={card.subtitle}
              footer={card.footer}
              interactive={interactive || !!card.onClick}
              onClick={card.onClick}
            >
              {card.content}
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};

CardList.displayName = 'CardList';

