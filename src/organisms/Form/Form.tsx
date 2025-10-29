import React from 'react';
import { FormField } from '../../molecules/FormField';
import { Button } from '../../atoms/Button';
import { Text } from '../../atoms/Text';
import styles from './Form.module.scss';
import clsx from 'clsx';

export interface FormFieldConfig {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  error?: string;
  value?: string;
}

export interface FormProps {
  /**
   * Form title
   */
  title?: string;
  /**
   * Form description
   */
  description?: string;
  /**
   * Form fields configuration
   */
  fields: FormFieldConfig[];
  /**
   * Callback when field value changes
   */
  onFieldChange?: (fieldId: string, value: string) => void;
  /**
   * Submit button label
   */
  submitLabel?: string;
  /**
   * Cancel button label (optional)
   */
  cancelLabel?: string;
  /**
   * Callback when form is submitted
   */
  onSubmit?: (values: Record<string, string>) => void;
  /**
   * Callback when form is cancelled
   */
  onCancel?: () => void;
  /**
   * Whether the form is in a loading state
   */
  loading?: boolean;
  /**
   * Additional CSS class name
   */
  className?: string;
}

export const Form: React.FC<FormProps> = ({
  title,
  description,
  fields,
  onFieldChange,
  submitLabel = 'Submit',
  cancelLabel,
  onSubmit,
  onCancel,
  loading = false,
  className,
}) => {
  const [values, setValues] = React.useState<Record<string, string>>(() => {
    const initialValues: Record<string, string> = {};
    fields.forEach((field) => {
      if (field.value !== undefined) {
        initialValues[field.id] = field.value;
      }
    });
    return initialValues;
  });

  const handleFieldChange = (fieldId: string, value: string) => {
    setValues((prev) => ({ ...prev, [fieldId]: value }));
    if (onFieldChange) {
      onFieldChange(fieldId, value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <form className={clsx(styles.form, className)} onSubmit={handleSubmit} noValidate>
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

      <div className={styles.fields}>
        {fields.map((field) => (
          <FormField
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type || 'text'}
            placeholder={field.placeholder}
            description={field.description}
            required={field.required}
            error={field.error}
            value={values[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
          />
        ))}
      </div>

      <div className={styles.actions}>
        {cancelLabel && onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
        )}
        <Button type="submit" variant="primary" loading={loading}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

Form.displayName = 'Form';
