import React, { useState } from 'react';
import Button from '../../shared/Button';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import { Item } from '../../../types';
import useInventoryItems from '../../../hooks/inventory/useInventoryItems';

interface AdjustmentFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const AdjustmentForm: React.FC<AdjustmentFormProps> = ({ onSubmit, onCancel }) => {
  const { items } = useInventoryItems();
  const [adjustments, setAdjustments] = useState([{
    itemId: '',
    systemStock: 0,
    actualStock: 0,
    reason: ''
  }]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date: new Date().toISOString(),
      adjustments,
      status: 'pending'
    });
  };

  const addItem = () => {
    setAdjustments([...adjustments, {
      itemId: '',
      systemStock: 0,
      actualStock: 0,
      reason: ''
    }]);
  };

  const removeItem = (index: number) => {
    setAdjustments(adjustments.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: string, value: any) => {
    const newAdjustments = [...adjustments];
    newAdjustments[index] = {
      ...newAdjustments[index],
      [field]: value
    };
    setAdjustments(newAdjustments);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {adjustments.map((adjustment, index) => (
          <div key={index} className="grid grid-cols-5 gap-4 items-start">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">物品</label>
              <select
                value={adjustment.itemId}
                onChange={(e) => updateItem(index, 'itemId', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value="">选择物品</option>
                {items.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({item.specification})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">系统库存</label>
              <input
                type="number"
                value={adjustment.systemStock}
                onChange={(e) => updateItem(index, 'systemStock', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">实际库存</label>
              <input
                type="number"
                value={adjustment.actualStock}
                onChange={(e) => updateItem(index, 'actualStock', parseInt(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>

            <div className="flex items-end">
              <Button
                type="button"
                variant="danger"
                size="sm"
                icon={<Trash2 className="w-4 h-4" />}
                onClick={() => removeItem(index)}
                className="mb-0.5"
              >
                删除
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          type="button"
          variant="secondary"
          icon={<Plus className="w-4 h-4" />}
          onClick={addItem}
        >
          添加物品
        </Button>

        <div className="flex space-x-4">
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
      </div>
    </form>
  );
};

export default AdjustmentForm;