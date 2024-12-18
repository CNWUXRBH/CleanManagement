import React from 'react';
import { Item } from '../../../types';
import { Category, Unit, Specification } from '../../../types/basicData';
import Card from '../../shared/Card';

interface BasicInfoProps {
  data: Partial<Item>;
  categories: Category[];
  units: Unit[];
  specifications: Specification[];
  errors: Record<string, string>;
  onChange: (updates: Partial<Item>) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({
  data,
  categories,
  units,
  specifications,
  errors,
  onChange
}) => {
  return (
    <Card title="基本信息">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">物品名称</label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => onChange({ name: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
              ${errors.name 
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">物品编码</label>
          <input
            type="text"
            value={data.code || ''}
            onChange={(e) => onChange({ code: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
              ${errors.code
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
          />
          {errors.code && (
            <p className="mt-1 text-sm text-red-600">{errors.code}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">物品类别</label>
          <select
            value={data.category || ''}
            onChange={(e) => onChange({ category: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
              ${errors.category
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
          >
            <option value="">选择类别</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">规格型号</label>
          <select
            value={data.specification || ''}
            onChange={(e) => onChange({ specification: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
              ${errors.specification
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
          >
            <option value="">选择规格</option>
            {specifications.map(spec => (
              <option key={spec.id} value={spec.id}>
                {spec.name}
              </option>
            ))}
          </select>
          {errors.specification && (
            <p className="mt-1 text-sm text-red-600">{errors.specification}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">计量单位</label>
          <select
            value={data.unit || ''}
            onChange={(e) => onChange({ unit: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
              ${errors.unit
                ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
          >
            <option value="">选择单位</option>
            {units.map(unit => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </select>
          {errors.unit && (
            <p className="mt-1 text-sm text-red-600">{errors.unit}</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default BasicInfo;