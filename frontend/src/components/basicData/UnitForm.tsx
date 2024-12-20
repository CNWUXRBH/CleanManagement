import React, { useState } from 'react';
import { Unit } from '../../types/basicData';
import Button from '../shared/Button';
import { Save, X } from 'lucide-react';
import { validateUnit } from '../../utils/basicData/validation';

interface UnitFormProps {
  unit?: Unit;
  baseUnits: Unit[];
  onSubmit: (unit: Partial<Unit>) => void;
  onCancel: () => void;
}

const UnitForm: React.FC<UnitFormProps> = ({
  unit,
  baseUnits,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<Unit>>(
    unit || {
      name: '',
      code: '',
      description: '',
      isBase: false,
      isActive: true
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateUnit(formData);
    if (!validation.isValid) {
      // Handle validation errors
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">单位名称</label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">单位编码</label>
          <input
            type="text"
            value={formData.code || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">描述</label>
          <textarea
            value={formData.description || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="col-span-2">
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={formData.isBase}
              onChange={(e) => setFormData(prev => ({ ...prev, isBase: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 
                border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">这是基本单位</label>
          </div>
        </div>

        {!formData.isBase && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">基本单位</label>
              <select
                value={formData.baseUnitId || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, baseUnitId: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value="">选择基本单位</option>
                {baseUnits.map(unit => (
                  <option key={unit.id} value={unit.id}>{unit.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">换算率</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.conversionRate || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  conversionRate: parseFloat(e.target.value)
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
          </>
        )}

        <div className="col-span-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 
                border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">启用此单位</label>
          </div>
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

export default UnitForm;