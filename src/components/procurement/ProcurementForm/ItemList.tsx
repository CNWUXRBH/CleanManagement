import React from 'react';
import { ProcurementItem } from '../../../types';
import Button from '../../shared/Button';
import { Trash2 } from 'lucide-react';
import { calculateItemTotal } from '../../../utils/procurement/orderCalculation';

interface ItemListProps {
  items: ProcurementItem[];
  onRemoveItem: (index: number) => void;
  onUpdateItem: (index: number, field: keyof ProcurementItem, value: any) => void;
  errors: Record<string, string>;
}

const ItemList: React.FC<ItemListProps> = ({
  items,
  onRemoveItem,
  onUpdateItem,
  errors
}) => {
  return (
    <div className="space-y-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              物品名称
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              数量
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              单价 (¥)
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              小计 (¥)
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              操作
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item, index) => (
            <tr key={index} className={errors[`item-${index}`] ? 'bg-red-50' : ''}>
              <td className="px-4 py-3">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => onUpdateItem(index, 'name', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm 
                    focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="输入物品名称"
                />
                {errors[`item-${index}`] && (
                  <p className="mt-1 text-sm text-red-600">{errors[`item-${index}`]}</p>
                )}
              </td>
              <td className="px-4 py-3">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onUpdateItem(index, 'quantity', parseInt(e.target.value))}
                  className="block w-32 rounded-md border-gray-300 shadow-sm 
                    focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </td>
              <td className="px-4 py-3">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={item.price}
                  onChange={(e) => onUpdateItem(index, 'price', parseFloat(e.target.value))}
                  className="block w-32 rounded-md border-gray-300 shadow-sm 
                    focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </td>
              <td className="px-4 py-3 text-sm text-gray-900">
                ¥{calculateItemTotal(item.quantity, item.price).toFixed(2)}
              </td>
              <td className="px-4 py-3">
                <Button
                  variant="danger"
                  size="sm"
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => onRemoveItem(index)}
                >
                  删除
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;