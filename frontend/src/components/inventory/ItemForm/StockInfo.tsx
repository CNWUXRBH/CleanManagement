import React from 'react';
import { Item } from '../../../types';
import Card from '../../shared/Card';

interface StockInfoProps {
  data: Partial<Item>;
  errors: Record<string, string>;
  onChange: (updates: Partial<Item>) => void;
}

const StockInfo: React.FC<StockInfoProps> = ({
  data,
  errors,
  onChange
}) => {
  return (
    <Card title="库存信息">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">当前库存</label>
          <input
            type="number"
            min="0"
            value={data.currentStock || ''}
            onChange={(e) => onChange({ currentStock: parseInt(e.target.value) })}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
              ${errors.currentStock
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
          />
          {errors.currentStock && (
            <p className="mt-1 text-sm text-red-600">{errors.currentStock}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">最小库存</label>
          <input
            type="number"
            min="0"
            value={data.minStock || ''}
            onChange={(e) => onChange({ minStock: parseInt(e.target.value) })}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
              ${errors.minStock
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
          />
          {errors.minStock && (
            <p className="mt-1 text-sm text-red-600">{errors.minStock}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">单价</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={data.price || ''}
            onChange={(e) => onChange({ price: parseFloat(e.target.value) })}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
              ${errors.price
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price}</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StockInfo;