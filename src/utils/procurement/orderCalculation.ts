import { ProcurementItem } from '../../types';

export const calculateItemTotal = (quantity: number, price: number): number => {
  return quantity * price;
};

export const calculateOrderTotal = (items: ProcurementItem[]): number => {
  return items.reduce((sum, item) => sum + calculateItemTotal(item.quantity, item.price), 0);
};

export const calculateTotalItems = (items: ProcurementItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

export const calculateUniqueItems = (items: ProcurementItem[]): number => {
  return items.length;
};

export const calculateAveragePrice = (items: ProcurementItem[]): number => {
  if (items.length === 0) return 0;
  const total = calculateOrderTotal(items);
  const totalQuantity = calculateTotalItems(items);
  return total / totalQuantity;
};