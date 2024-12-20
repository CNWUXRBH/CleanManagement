import React from 'react';
import { Warehouse } from '../../types';
import Card from '../shared/Card';
import Button from '../shared/Button';
import { MapPin, Package, BarChart3, Edit } from 'lucide-react';

interface WarehouseCardProps {
  warehouse: Warehouse;
}

const WarehouseCard: React.FC<WarehouseCardProps> = ({ warehouse }) => {
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{warehouse.name}</h3>
          <div className="flex items-center mt-1 text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{warehouse.location}</span>
          </div>
        </div>
        <Button
          variant="secondary"
          size="sm"
          icon={<Edit className="w-4 h-4" />}
        >
          编辑
        </Button>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Package className="w-4 h-4 mr-2" />
          当前库存：2,580件
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <BarChart3 className="w-4 h-4 mr-2" />
          库位使用率：75%
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">库存总值</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">¥128,580</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">库位总数</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">{warehouse.capacity}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WarehouseCard;