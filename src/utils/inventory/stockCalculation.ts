import { Item } from '../../types';
import { InventoryMovement } from '../../types/inventory';

export const calculateNewStock = (
  currentStock: number,
  movement: Pick<InventoryMovement, 'type' | 'quantity'>
): number => {
  return movement.type === 'in' 
    ? currentStock + movement.quantity 
    : currentStock - movement.quantity;
};

export const calculateStockValue = (item: Pick<Item, 'currentStock' | 'price'>): number => {
  return item.currentStock * item.price;
};

export const calculateReorderPoint = (
  averageDailyUsage: number,
  leadTimeDays: number,
  safetyStock: number
): number => {
  return (averageDailyUsage * leadTimeDays) + safetyStock;
};

export const calculateEconomicOrderQuantity = (
  annualDemand: number,
  orderCost: number,
  holdingCost: number
): number => {
  return Math.sqrt((2 * annualDemand * orderCost) / holdingCost);
};