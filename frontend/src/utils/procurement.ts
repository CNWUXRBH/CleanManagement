// Utility functions for procurement calculations and validations
export const calculateItemTotal = (quantity: number, price: number): number => {
  return quantity * price;
};

export const calculateOrderTotal = (
  items: Array<{ quantity: number; price: number }>
): number => {
  return items.reduce((sum, item) => sum + calculateItemTotal(item.quantity, item.price), 0);
};

export const generateOrderNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `PO${year}${month}${random}`;
};

export const validateProcurementItem = (
  item: { name: string; quantity: number; price: number }
): string[] => {
  const errors: string[] = [];
  if (!item.name.trim()) errors.push('物品名称不能为空');
  if (item.quantity <= 0) errors.push('数量必须大于0');
  if (item.price <= 0) errors.push('单价必须大于0');
  return errors;
};