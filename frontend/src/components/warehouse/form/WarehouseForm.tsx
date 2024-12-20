import React, { useState } from 'react';
import { Warehouse } from '../../../types';
import Button from '../../shared/Button';
import { Save, X } from 'lucide-react';

interface WarehouseFormProps {
  warehouse?: Warehouse;
  onSubmit: (warehouse: Partial<Warehouse>) => void;
  onCancel: () => void;
}

const WarehouseForm: React.FC<WarehouseFormProps> = ({
  warehouse,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Partial<Warehouse>>(
    warehouse || {
      name: '',
      location: '',
      capacity: 0,
    }
  );

  const [errors, setErrors] = useState<string[]>([]);

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!formData.name?.trim()) newErrors.push('仓库名称不能为空');
    if (!formData.location?.trim()) newErrors.push('仓库地址不能为空');
    if (!formData.capacity || formData.capacity <= 0) newErrors.push('库位容量必须大于0');
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    onSubmit(formData);
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
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">仓库名称</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">仓库地址</label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">库位容量</label>
          <input
            type="number"
            min="1"
            value={formData.capacity || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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

export default WarehouseForm;