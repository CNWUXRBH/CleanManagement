import { Item } from '../../types';
import { InventoryMovement } from '../../types/inventory';

export interface StockValidationError {
  code: string;
  message: string;
}

export const validateStockLevel = (
  item: Pick<Item, 'currentStock' | 'minStock'>
): StockValidationError[] => {
  const errors: StockValidationError[] = [];

  if (item.currentStock < 0) {
    errors.push({
      code: 'NEGATIVE_STOCK',
      message: '库存不能为负数'
    });
  }

  if (item.currentStock <= item.minStock) {
    errors.push({
      code: 'LOW_STOCK',
      message: '库存低于最小库存量'
    });
  }

  return errors;
};

export const validateMovement = (
  movement: Pick<InventoryMovement, 'type' | 'quantity'>,
  currentStock: number
): StockValidationError[] => {
  const errors: StockValidationError[] = [];

  if (movement.quantity <= 0) {
    errors.push({
      code: 'INVALID_QUANTITY',
      message: '数量必须大于0'
    });
  }

  if (movement.type === 'out' && movement.quantity > currentStock) {
    errors.push({
      code: 'INSUFFICIENT_STOCK',
      message: '库存不足'
    });
  }

  return errors;
};