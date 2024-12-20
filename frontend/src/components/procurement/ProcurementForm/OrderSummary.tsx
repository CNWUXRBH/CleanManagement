import React from 'react';
import { ProcurementItem } from '../../../types';
import Card from '../../shared/Card';
import { calculateOrderTotal, calculateTotalItems } from '../../../utils/procurement/orderCalculation';

interface OrderSummaryProps {
  items: ProcurementItem[];
  department: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, department }) => {
  const totalAmount = calculateOrderTotal(items);
  const totalItems = calculateTotalItems(items);

  return (
    <Card title="订单摘要" className="bg-gray-50">
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">申请部门</span>
          <span className="font-medium">{department || '-'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">物品种类</span>
          <span className="font-medium">{items.length} 种</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">物品总数</span>
          <span className="font-medium">{totalItems} 件</span>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between">
            <span className="font-medium">总金额</span>
            <span className="text-lg font-bold text-blue-600">
              ¥{totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OrderSummary;