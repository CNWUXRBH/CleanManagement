import { useState } from 'react';
import { ProcurementItem } from '../../types';
import { validateProcurementItem } from '../../utils/procurement';

export const useProcurementForm = () => {
  const [department, setDepartment] = useState('');
  const [items, setItems] = useState<ProcurementItem[]>([
    { id: '1', name: '', quantity: 1, price: 0 },
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), name: '', quantity: 1, price: 0 },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof ProcurementItem, value: any) => {
    setItems(
      items.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
    
    // Clear error when user starts typing
    if (errors[`item-${index}`]) {
      const newErrors = { ...errors };
      delete newErrors[`item-${index}`];
      setErrors(newErrors);
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!department) {
      newErrors.department = '请选择申请部门';
    }

    items.forEach((item, index) => {
      const itemErrors = validateProcurementItem(item);
      if (itemErrors.length > 0) {
        newErrors[`item-${index}`] = itemErrors[0];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    department,
    setDepartment,
    items,
    errors,
    addItem,
    removeItem,
    updateItem,
    validate,
  };
};

export default useProcurementForm;