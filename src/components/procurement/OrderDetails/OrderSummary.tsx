import React from 'react';
import { ProcurementOrder } from '../../../types';
import { Calendar, Building2, DollarSign, Package } from 'lucide-react';
import { calculateTotalItems } from '../../../utils/procurement/orderCalculation';

interface OrderSummaryProps {
  order: ProcurementOrder;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  const totalItems = calculateTotalItems(order.items);

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-900 mb-4">订单摘要</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            申请日期
          </div>
          <span className="font-medium text-gray-900">{order.requestDate}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <Building2 className="w-4 h-4 mr-2" />
            申请部门
          </div>
          <span className="font-medium text-gray-900">{order.department}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-500">
            <Package className="w-4 h-4 mr-2" />
            物品总数
          </div>
          <span className="font-medium text-gray-900">{totalItems} 件</span>
        </div>

        <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-200">
          <div className="flex items-center text-gray-900 font-medium">
            <DollarSign className="w-4 h-4 mr-2" />
            总金额
          </div>
          <span className="font-bold text-blue-600">¥{order.totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;