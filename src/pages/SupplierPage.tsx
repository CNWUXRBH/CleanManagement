import React from 'react';
import SupplierList from '../components/supplier/SupplierList';
import SupplierHeader from '../components/supplier/SupplierHeader';
import SupplierFilters from '../components/supplier/SupplierFilters';
import { useSupplierFilters } from '../hooks/supplier/useSupplierFilters';

const SupplierPage: React.FC = () => {
  const {
    filters,
    handleSearch,
    handleCategoryFilter,
    handleStatusFilter
  } = useSupplierFilters();

  return (
    <div className="p-6">
      <SupplierHeader />
      
      <SupplierFilters
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        onStatusFilter={handleStatusFilter}
      />

      <SupplierList filters={filters} />
    </div>
  );
};

export default SupplierPage;