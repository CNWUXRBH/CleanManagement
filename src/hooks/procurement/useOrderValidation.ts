import { useState, useCallback } from 'react';
import { ProcurementOrder } from '../../types';
import { ValidationError, validateOrder, hasErrors } from '../../utils/procurement/orderValidation';

export const useOrderValidation = () => {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateForm = useCallback((order: Partial<ProcurementOrder>): boolean => {
    const validationErrors = validateOrder(order);
    setErrors(validationErrors);
    return !hasErrors(validationErrors);
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const getFieldError = useCallback((field: string): string | undefined => {
    const error = errors.find(e => e.field === field);
    return error?.message;
  }, [errors]);

  return {
    errors,
    validateForm,
    clearErrors,
    getFieldError,
    hasErrors: errors.length > 0
  };
};

export default useOrderValidation;