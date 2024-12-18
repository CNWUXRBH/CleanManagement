import { InventoryMovement, MovementType, MovementReason } from '../types/inventory';

export const generateMovementId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `MOV${timestamp}${random}`;
};

export const validateMovement = (movement: Partial<InventoryMovement>): string[] => {
  const errors: string[] = [];
  if (!movement.itemId) errors.push('物品ID不能为空');
  if (!movement.type) errors.push('移动类型不能为空');
  if (!movement.reason) errors.push('移动原因不能为空');
  if (typeof movement.quantity !== 'number' || movement.quantity <= 0) {
    errors.push('数量必须大于0');
  }
  if (!movement.date) errors.push('日期不能为空');
  if (!movement.operatorId) errors.push('操作人不能为空');
  return errors;
};

export const calculateNewStock = (
  currentStock: number,
  type: MovementType,
  quantity: number
): number => {
  return type === 'in' ? currentStock + quantity : currentStock - quantity;
};

export const getReasonText = (reason: MovementReason): string => {
  const reasonMap: Record<MovementReason, string> = {
    purchase: '采购入库',
    return: '退货入库',
    requisition: '领用出库',
    disposal: '报废出库',
    adjustment: '库存调整',
    transfer: '库存转移'
  };
  return reasonMap[reason];
};