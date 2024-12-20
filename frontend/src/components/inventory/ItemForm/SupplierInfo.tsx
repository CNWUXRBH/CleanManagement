import React from 'react';
import { Item } from '../../../types';
import Card from '../../shared/Card';

interface SupplierInfoProps {
  data: Partial<Item>;
  errors: Record<string, string>;
  onChange: (updates: Partial<Item>) => void;
}

const SupplierInfo: React.FC<SupplierInfoProps> = ({
  data,
  errors,
  onChange
}) => {
  return (
    <Card title="供应商信息">
      <div>
        <label className="block text-sm font-medium text-gray-700">供应商</label>
        <select
          value={data.supplierId || ''}
          onChange={(e) => onChange({ supplierId: e.target.value })}
          className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
            ${errors.supplierId
              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
        >
          <option value="">选择供应商</option>
          {/* TODO: Add supplier options */}
        </select>
        {errors.supplierId && (
          <p className="mt-1 text-sm text-red-600">{errors.supplierId}</p>
        )}
      </div>
    </Card>
  );
};

export default SupplierInfo;