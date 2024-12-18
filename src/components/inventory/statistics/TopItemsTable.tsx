import React from 'react';
import { Item } from '../../../types';
import { formatCurrency } from '../../../utils/inventory';

interface TopItemsTableProps {
  items: (Item & { totalValue: number })[];
  type: 'value' | 'quantity';
}

const TopItemsTable: React.FC<TopItemsTableProps> = ({ items, type }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              排名
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              物品名称
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {type === 'value' ? '库存金额' : '库存数量'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              占比
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item, index) => (
            <tr key={item.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.specification}</p>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {type === 'value' 
                  ? formatCurrency(item.totalValue)
                  : `${item.currentStock} ${item.unit}`
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {((type === 'value' 
                  ? item.totalValue / items.reduce((sum, i) => sum + i.totalValue, 0)
                  : item.currentStock / items.reduce((sum, i) => sum + i.currentStock, 0)
                ) * 100).toFixed(1)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopItemsTable;