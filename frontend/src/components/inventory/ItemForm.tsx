import React, { useState } from 'react';
import { Item } from '../../types';
import { validateItem } from '../../utils/inventory';
import Button from '../shared/Button';
import { Save, X } from 'lucide-react';

interface ItemFormProps {
  item?: Item;
  onSubmit: (item: Item) => void;
  onCancel: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Item>>(item || {
    name: '',
    category: '',
    specification: '',
    unit: '',
    minStock: 0,
    currentStock: 0,
    price: 0,
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateItem(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData as Item);
  };

  const handleChange = (field: keyof Item, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors([]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.length > 0 && (
        <div className="bg-red-50 p-4 rounded-md">
          <div className="text-sm text-red-700">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">物品名称</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">类别</label>
          <select
            value={formData.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="">选择类别</option>
            <option value="cleaning">清洁用品</option>
            <option value="paper">纸制品</option>
            <option value="chemical">化学用品</option>
            <option value="tools">清洁工具</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">规格</label>
          <input
            type="text"
            value={formData.specification || ''}
            onChange={(e) => handleChange('specification', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">单位</label>
          <input
            type="text"
            value={formData.unit || ''}
            onChange={(e) => handleChange('unit', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">最小库存</label>
          <input
            type="number"
            min="0"
            value={formData.minStock || ''}
            onChange={(e) => handleChange('minStock', parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">当前库存</label>
          <input
            type="number"
            min="0"
            value={formData.currentStock || ''}
            onChange={(e) => handleChange('currentStock', parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">单价</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.price || ''}
            onChange={(e) => handleChange('price', parseFloat(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="secondary"
          icon={<X className="w-4 h-4" />}
          onClick={onCancel}
        >
          取消
        </Button>
        <Button
          type="submit"
          variant="primary"
          icon={<Save className="w-4 h-4" />}
        >
          保存
        </Button>
      </div>
    </form>
  );
};

export default ItemForm;