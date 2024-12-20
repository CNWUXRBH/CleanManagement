import React from 'react';
import { Item } from '../../types';
import { Package, Edit, Trash2 } from 'lucide-react';
import Button from '../shared/Button';
import StockLevelBadge from './StockLevelBadge';
import { formatCurrency } from '../../utils/format';

interface ItemCardProps {
  item: Item;
  onEdit?: (item: Item) => void;
  onDelete?: (id: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.code}</p>
          </div>
        </div>
        <StockLevelBadge currentStock={item.currentStock} minStock={item.minStock} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">规格</p>
          <p className="font-medium">{item.specification}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">单位</p>
          <p className="font-medium">{item.unit}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">当前库存</p>
          <p className="font-medium">{item.currentStock}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">单价</p>
          <p className="font-medium">{formatCurrency(item.price)}</p>
        </div>
      </div>

      {(onEdit || onDelete) && (
        <div className="flex justify-end space-x-2">
          {onEdit && (
            <Button
              variant="secondary"
              size="sm"
              icon={<Edit className="w-4 h-4" />}
              onClick={() => onEdit(item)}
            >
              编辑
            </Button>
          )}
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              icon={<Trash2 className="w-4 h-4" />}
              onClick={() => onDelete(item.id)}
            >
              删除
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemCard;