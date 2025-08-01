import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { api, ApiError } from '../lib/api';

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationSchema {
  [key: string]: ValidationRule;
}

export interface FormSubmissionOptions<T> {
  endpoint: string;
  method?: 'POST' | 'PUT' | 'DELETE';
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useFormSubmission<T = any>(
  validationSchema: ValidationSchema,
  options: FormSubmissionOptions<T>
) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = useCallback((data: any): { [key: string]: string } => {
    const validationErrors: { [key: string]: string } = {};

    Object.keys(validationSchema).forEach((field) => {
      const value = data[field];
      const rules = validationSchema[field];

      // Validation required
      if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
        validationErrors[field] = 'Ce champ est requis';
        return;
      }

      // Skip other validations if value is empty and not required
      if (!value && !rules.required) return;

      // Validation minLength
      if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        validationErrors[field] = `Minimum ${rules.minLength} caractères`;
        return;
      }

      // Validation maxLength
      if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
        validationErrors[field] = `Maximum ${rules.maxLength} caractères`;
        return;
      }

      // Validation pattern
      if (rules.pattern && typeof value === 'string' && !rules.pattern.test(value)) {
        validationErrors[field] = 'Format invalide';
        return;
      }

      // Validation custom
      if (rules.custom) {
        const customError = rules.custom(value);
        if (customError) {
          validationErrors[field] = customError;
          return;
        }
      }
    });

    return validationErrors;
  }, [validationSchema]);

  const submit = useCallback(async (data: any) => {
    const validationErrors = validate(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error('Veuillez corriger les erreurs du formulaire');
      return { success: false, errors: validationErrors };
    }

    setLoading(true);

    try {
      let response: T;

      switch (options.method) {
        case 'PUT':
          response = await api.put<T>(options.endpoint, data);
          break;
        case 'DELETE':
          response = await api.delete<T>(options.endpoint);
          break;
        default:
          response = await api.post<T>(options.endpoint, data);
      }

      toast.success(options.successMessage || 'Opération réussie !');
      options.onSuccess?.(response);
      
      return { success: true, data: response };
    } catch (error) {
      const apiError = error instanceof ApiError ? error : new ApiError('Une erreur est survenue');
      
      toast.error(options.errorMessage || apiError.message);
      options.onError?.(apiError);
      
      return { success: false, error: apiError };
    } finally {
      setLoading(false);
    }
  }, [validate, options]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    loading,
    errors,
    submit,
    clearErrors,
    setErrors,
  };
} 