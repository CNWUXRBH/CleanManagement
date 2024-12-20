// Utility functions for inventory management
import { Item } from '../types';

export const calculateStockStatus = (currentStock: number, minStock: number): 'normal' | 'low' | 'out' => {
  if (currentStock === 0) return 'out';
  if (currentStock <= minStock) return 'low';
  return 'normal';
};

export const formatCurrency = (amount: number): string => {
  return `¥${amount.toFixed(2)}`;
};

export const generateItemCode = (category: string, index: number): string => {
  const categoryPrefix = category.substring(0, 2).toUpperCase();
  const numberPart = String(index).padStart(4, '0');
  return `${categoryPrefix}${numberPart}`;
};

export const validateItem = (item: Partial<Item>): string[] => {
  const errors: string[] = [];
  if (!item.name?.trim()) errors.push('物品名称不能为空');
  if (!item.category?.trim()) errors.push('物品类别不能为空');
  if (!item.specification?.trim()) errors.push('规格不能为空');
  if (!item.unit?.trim()) errors.push('单位不能为空');
  if (typeof item.minStock !== 'number' || item.minStock < 0) errors.push('最小库存必须大于等于0');
  if (typeof item.currentStock !== 'number' || item.currentStock < 0) errors.push('当前库存必须大于等于0');
  if (typeof item.price !== 'number' || item.price <= 0) errors.push('单价必须大于0');
  return errors;
};