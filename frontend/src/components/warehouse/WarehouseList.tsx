import React from 'react';
import { Warehouse } from '../../types';
import WarehouseCard from './WarehouseCard';
import { Loader2 } from 'lucide-react';

interface WarehouseListProps {
  warehouses: Warehouse[];
  isLoading: boolean;
}

const WarehouseList: React.FC<WarehouseListProps> = ({ warehouses, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {warehouses.map((warehouse) => (
        <WarehouseCard key={warehouse.id} warehouse={warehouse} />
      ))}
    </div>
  );
};

export default WarehouseList;