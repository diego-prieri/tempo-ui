import React from 'react';
import { Input } from '../../atoms/Input';
import { Text } from '../../atoms/Text';
import styles from './FormField.module.scss';
import clsx from 'clsx';

export interface FormFieldProps extends Omit<React.ComponentProps<typeof Input>, 'label'> {
  /**
   * Label for the form field
   */
  label: string;
  /**
   * Description or helper text
   */
  description?: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Whether the field is required
   */
  required?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  description,
  error,
  required = false,
  className,
  id,
  helperText,
  ...restProps
}) => {
  const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={clsx(styles.formField, className)}>
      <div className={styles.labelWrapper}>
        <Text variant="label" size="sm" className={styles.label}>
          {label}
          {required && (
            <span className={styles.required} aria-label="required">
              *
            </span>
          )}
        </Text>
        {description && (
          <Text variant="caption" size="xs" className={styles.description}>
            {description}
          </Text>
        )}
      </div>
      <Input
        {...restProps}
        id={fieldId}
        label=""
        helperText={error ? undefined : helperText}
        error={error}
        required={required}
        aria-describedby={
          description ? `${fieldId}-description` : undefined
        }
      />
      {description && (
        <div id={`${fieldId}-description`} className="sr-only">
          {description}
        </div>
      )}
    </div>
  );
};

FormField.displayName = 'FormField';
