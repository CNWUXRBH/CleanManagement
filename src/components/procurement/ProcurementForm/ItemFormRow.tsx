import React from 'react';
import { ProcurementItem } from '../../../types';
import Button from '../../shared/Button';
import { Trash2 } from 'lucide-react';
import { calculateItemTotal } from '../../../utils/procurement/orderCalculation';

interface ItemFormRowProps {
  item: ProcurementItem;
  index: number;
  onUpdate: (index: number, field: keyof ProcurementItem, value: any) => void;
  onRemove: (index: number) => void;
  error?: string;
}

const ItemFormRow: React.FC<ItemFormRowProps> = ({
  item,
  index,
  onUpdate,
  onRemove,
  error
}) => {
  const subtotal = calculateItemTotal(item.quantity, item.price);

  return (
    <tr className={error ? 'bg-red-50' : ''}>
      <td className="px-4 py-3">
        <div className="space-y-1">
          <input
            type="text"
            value={item.name}
            onChange={(e) => onUpdate(index, 'name', e.target.value)}
            className={`block w-full rounded-md shadow-sm sm:text-sm
              ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                     : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'}`}
            placeholder="输入物品名称"
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </td>
      <td className="px-4 py-3">
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) => onUpdate(index, 'quantity', parseInt(e.target.value))}
          className="block w-32 rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </td>
      <td className="px-4 py-3">
        <input
          type="number"
          step="0.01"
          min="0"
          value={item.price}
          onChange={(e) => onUpdate(index, 'price', parseFloat(e.target.value))}
          className="block w-32 rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </td>
      <td className="px-4 py-3 text-sm text-gray-900">
        ¥{subtotal.toFixed(2)}
      </td>
      <td className="px-4 py-3">
        <Button
          variant="danger"
          size="sm"
          icon={<Trash2 className="w-4 h-4" />}
          onClick={() => onRemove(index)}
        >
          删除
        </Button>
      </td>
    </tr>
  );
};

export default ItemFormRow;