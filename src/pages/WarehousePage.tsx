import React from 'react';
import WarehouseHeader from '../components/warehouse/WarehouseHeader';
import WarehouseStats from '../components/warehouse/WarehouseStats';
import WarehouseList from '../components/warehouse/WarehouseList';
import { useWarehouses } from '../hooks/warehouse/useWarehouses';

const WarehousePage: React.FC = () => {
  const { warehouses, isLoading } = useWarehouses();

  return (
    <div className="p-6">
      <WarehouseHeader />
      
      <div className="mb-6">
        <WarehouseStats warehouses={warehouses} />
      </div>

      <WarehouseList warehouses={warehouses} isLoading={isLoading} />
    </div>
  );
};

export default WarehousePage;