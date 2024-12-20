import React, { useState } from 'react';
import Button from '../shared/Button';
import { Plus, Trash2 } from 'lucide-react';

interface RequisitionFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

interface RequisitionItem {
  itemId: string;
  name: string;
  quantity: number;
  unit: string;
}

const RequisitionForm: React.FC<RequisitionFormProps> = ({ onSubmit, onCancel }) => {
  const [department, setDepartment] = useState('');
  const [items, setItems] = useState<RequisitionItem[]>([
    { itemId: '', name: '', quantity: 1, unit: '个' }
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addItem = () => {
    setItems([...items, { itemId: '', name: '', quantity: 1, unit: '个' }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof RequisitionItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!department) {
      newErrors.department = '请选择申请部门';
    }

    items.forEach((item, index) => {
      if (!item.name) {
        newErrors[`item-${index}-name`] = '请输入物品名称';
      }
      if (item.quantity <= 0) {
        newErrors[`item-${index}-quantity`] = '数量必须大于0';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        department,
        items,
        requestDate: new Date().toISOString(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">申请部门</label>
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="">请选择部门</option>
          <option value="cleaning">清洁部</option>
          <option value="logistics">后勤部</option>
          <option value="security">保安部</option>
        </select>
        {errors.department && (
          <p className="mt-1 text-sm text-red-600">{errors.department}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">领用物品</h3>
          <Button
            type="button"
            variant="secondary"
            icon={<Plus className="w-4 h-4" />}
            onClick={addItem}
          >
            添加物品
          </Button>
        </div>

        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-5">
              <label className="block text-sm font-medium text-gray-700">物品名称</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(index, 'name', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="输入物品名称"
              />
              {errors[`item-${index}-name`] && (
                <p className="mt-1 text-sm text-red-600">{errors[`item-${index}-name`]}</p>
              )}
            </div>

            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">数量</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                min="1"
              />
              {errors[`item-${index}-quantity`] && (
                <p className="mt-1 text-sm text-red-600">{errors[`item-${index}-quantity`]}</p>
              )}
            </div>

            <div className="col-span-3">
              <label className="block text-sm font-medium text-gray-700">单位</label>
              <select
                value={item.unit}
                onChange={(e) => updateItem(index, 'unit', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="个">个</option>
                <option value="箱">箱</option>
                <option value="瓶">瓶</option>
                <option value="包">包</option>
                <option value="卷">卷</option>
              </select>
            </div>

            <div className="col-span-1">
              {items.length > 1 && (
                <Button
                  type="button"
                  variant="danger"
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => removeItem(index)}
                >
                  删除
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          取消
        </Button>
        <Button type="submit" variant="primary">
          提交申请
        </Button>
      </div>
    </form>
  );
};

export default RequisitionForm; 