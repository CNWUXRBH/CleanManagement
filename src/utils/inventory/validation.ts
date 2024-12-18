import { Item } from '../../types';

export const validateItem = (item: Partial<Item>): string[] => {
  const errors: string[] = [];

  if (!item.name?.trim()) {
    errors.push('name: 物品名称不能为空');
  }

  if (!item.code?.trim()) {
    errors.push('code: 物品编码不能为空');
  }

  if (!item.category?.trim()) {
    errors.push('category: 必须选择物品类别');
  }

  if (!item.specification?.trim()) {
    errors.push('specification: 必须选择规格型号');
  }

  if (!item.unit?.trim()) {
    errors.push('unit: 必须选择计量单位');
  }

  if (typeof item.currentStock !== 'number' || item.currentStock < 0) {
    errors.push('currentStock: 当前库存必须大于等于0');
  }

  if (typeof item.minStock !== 'number' || item.minStock < 0) {
    errors.push('minStock: 最小库存必须大于等于0');
  }

  if (typeof item.price !== 'number' || item.price <= 0) {
    errors.push('price: 单价必须大于0');
  }

  if (!item.supplierId?.trim()) {
    errors.push('supplierId: 必须选择供应商');
  }

  return errors;
};