import { useState } from 'react';
import { Item } from '../../types';
import { validateItem } from '../../utils/inventory/validation';

export const useItemForm = (initialData?: Item) => {
  const [formData, setFormData] = useState<Partial<Item>>(
    initialData || {
      name: '',
      code: '',
      category: '',
      specification: '',
      unit: '',
      currentStock: 0,
      minStock: 0,
      price: 0,
      supplierId: ''
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateBasicInfo = (updates: Partial<Item>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear related errors
    const newErrors = { ...errors };
    Object.keys(updates).forEach(key => delete newErrors[key]);
    setErrors(newErrors);
  };

  const updateStockInfo = (updates: Partial<Item>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear related errors
    const newErrors = { ...errors };
    Object.keys(updates).forEach(key => delete newErrors[key]);
    setErrors(newErrors);
  };

  const updateSupplierInfo = (updates: Partial<Item>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear related errors
    const newErrors = { ...errors };
    Object.keys(updates).forEach(key => delete newErrors[key]);
    setErrors(newErrors);
  };

  const validate = (): boolean => {
    const validationErrors = validateItem(formData);
    const newErrors: Record<string, string> = {};
    
    validationErrors.forEach(error => {
      const [field, message] = error.split(':');
      newErrors[field.trim()] = message.trim();
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    updateBasicInfo,
    updateStockInfo,
    updateSupplierInfo,
    validate
  };
};

export default useItemForm;