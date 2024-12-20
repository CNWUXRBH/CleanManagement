import React from 'react';
import { ProcurementItem } from '../../../types';
import { calculateOrderTotal, calculateTotalItems } from '../../../utils/procurement/orderCalculation';
import { Package, DollarSign } from 'lucide-react';

interface ItemSummaryProps {
  items: ProcurementItem[];
}

const ItemSummary: React.FC<ItemSummaryProps> = ({ items }) => {
  const totalAmount = calculateOrderTotal(items);
  const totalQuantity = calculateTotalItems(items);

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="text-sm font-medium text-gray-900 mb-4">物品汇总</h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Package className="h-5 w-5 text-gray-400 mr-2" />
          <div>
            <p className="text-sm text-gray-500">总数量</p>
            <p className="text-lg font-semibold text-gray-900">{totalQuantity} 件</p>
          </div>
        </div>
        <div className="flex items-center">
          <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
          <div>
            <p className="text-sm text-gray-500">总金额</p>
            <p className="text-lg font-semibold text-gray-900">¥{totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemSummary;