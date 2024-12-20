import { ProcurementOrder, ProcurementItem } from '../../types';

export interface ValidationError {
  field: string;
  message: string;
}

export const validateOrder = (order: Partial<ProcurementOrder>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!order.department?.trim()) {
    errors.push({
      field: 'department',
      message: '请选择申请部门'
    });
  }

  if (!order.items?.length) {
    errors.push({
      field: 'items',
      message: '请至少添加一个物品'
    });
  } else {
    order.items.forEach((item, index) => {
      const itemErrors = validateOrderItem(item);
      itemErrors.forEach(error => {
        errors.push({
          field: `items[${index}].${error.field}`,
          message: error.message
        });
      });
    });
  }

  return errors;
};

export const validateOrderItem = (item: Partial<ProcurementItem>): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!item.name?.trim()) {
    errors.push({
      field: 'name',
      message: '物品名称不能为空'
    });
  }

  if (!item.quantity || item.quantity <= 0) {
    errors.push({
      field: 'quantity',
      message: '数量必须大于0'
    });
  }

  if (!item.price || item.price <= 0) {
    errors.push({
      field: 'price',
      message: '单价必须大于0'
    });
  }

  return errors;
};

export const hasErrors = (errors: ValidationError[]): boolean => {
  return errors.length > 0;
};