import React, { useState } from 'react';
import { InventoryMovement, MovementType, MovementReason } from '../../../types/inventory';
import { validateMovement, generateMovementId } from '../../../utils/inventoryMovement';
import Button from '../../shared/Button';
import { Save, X } from 'lucide-react';

interface MovementFormProps {
  itemId: string;
  onSubmit: (movement: InventoryMovement) => void;
  onCancel: () => void;
}

const MovementForm: React.FC<MovementFormProps> = ({ itemId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<InventoryMovement>>({
    itemId,
    type: 'in',
    reason: 'purchase',
    quantity: 1,
    date: new Date().toISOString().split('T')[0],
    operatorId: 'CURRENT_USER_ID', // 实际应从用户上下文获取
  });
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateMovement(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const movement: InventoryMovement = {
      id: generateMovementId(),
      ...formData as Omit<InventoryMovement, 'id'>
    };
    onSubmit(movement);
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
          <label className="block text-sm font-medium text-gray-700">移动类型</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as MovementType }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="in">入库</option>
            <option value="out">出库</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">原因</label>
          <select
            value={formData.reason}
            onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value as MovementReason }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="purchase">采购入库</option>
            <option value="return">退货入库</option>
            <option value="requisition">领用出库</option>
            <option value="disposal">报废出库</option>
            <option value="adjustment">库存调整</option>
            <option value="transfer">库存转移</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">数量</label>
          <input
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">日期</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">备注</label>
          <textarea
            value={formData.note || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, note: e.target.value }))}
            rows={3}
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

export default MovementForm;