import React from 'react';
import { Item } from '../../../types';
import CategoryIcon from '../CategoryIcon';
import { formatCurrency } from '../../../utils/inventory';
import { Package, Ruler, CreditCard, Building } from 'lucide-react';

interface ItemDetailsProps {
  item: Item;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item }) => {
  const details = [
    { icon: <Package className="w-5 h-5" />, label: '物品编码', value: item.code },
    { icon: <Ruler className="w-5 h-5" />, label: '规格', value: item.specification },
    { icon: <CreditCard className="w-5 h-5" />, label: '单价', value: formatCurrency(item.price) },
    { icon: <Building className="w-5 h-5" />, label: '供应商', value: item.supplierId },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <CategoryIcon category={item.category} className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
          <p className="text-sm text-gray-500">{item.code}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {details.map((detail, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex-shrink-0 text-gray-400">{detail.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{detail.label}</p>
              <p className="font-medium text-gray-900">{detail.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">库存信息</h3>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-500">当前库存</p>
            <p className="text-2xl font-semibold text-gray-900">{item.currentStock}</p>
            <p className="text-sm text-gray-500">{item.unit}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">最小库存</p>
            <p className="text-2xl font-semibold text-gray-900">{item.minStock}</p>
            <p className="text-sm text-gray-500">{item.unit}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">库存金额</p>
            <p className="text-2xl font-semibold text-gray-900">
              {formatCurrency(item.currentStock * item.price)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetails;