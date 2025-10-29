import React from 'react';
import { SearchBar } from '../../molecules/SearchBar';
import styles from './Header.module.scss';
import clsx from 'clsx';

export interface HeaderProps {
  /**
   * Site logo or brand name
   */
  logo?: React.ReactNode;
  /**
   * Navigation items
   */
  navigation?: Array<{
    label: string;
    href: string;
  }>;
  /**
   * Search functionality
   */
  search?: {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
  };
  /**
   * Action buttons
   */
  actions?: React.ReactNode;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  navigation = [],
  search,
  actions,
  className,
}) => {
  return (
    <header className={clsx(styles.header, className)} role="banner">
      <div className={styles.container}>
        <div className={styles.leftSection}>
          {logo && <div className={styles.logo}>{logo}</div>}
          {navigation.length > 0 && (
            <nav className={styles.navigation} role="navigation" aria-label="Main navigation">
              <ul className={styles.navList}>
                {navigation.map((item, index) => (
                  <li key={index}>
                    <a href={item.href} className={styles.navLink}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        <div className={styles.rightSection}>
          {search && (
            <div className={styles.searchWrapper}>
              <SearchBar
                placeholder={search.placeholder}
                value={search.value}
                onChange={search.onChange}
                onSubmit={search.onSubmit}
                size="sm"
              />
            </div>
          )}
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
