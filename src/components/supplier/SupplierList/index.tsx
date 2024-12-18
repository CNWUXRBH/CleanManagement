import React from 'react';
import { Supplier } from '../../../types';
import SupplierCard from './SupplierCard';
import { useSuppliers } from '../../../hooks/supplier/useSuppliers';

interface SupplierListProps {
  filters: {
    search: string;
    category: string;
    status: string;
  };
}

const SupplierList: React.FC<SupplierListProps> = ({ filters }) => {
  const { suppliers, isLoading } = useSuppliers(filters);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {suppliers.map((supplier) => (
        <SupplierCard key={supplier.id} supplier={supplier} />
      ))}
    </div>
  );
};

export default SupplierList;