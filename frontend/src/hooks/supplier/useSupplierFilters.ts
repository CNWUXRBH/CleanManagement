import { useState } from 'react';

export const useSupplierFilters = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: ''
  });

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, search: query }));
  };

  const handleCategoryFilter = (category: string) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleStatusFilter = (status: string) => {
    setFilters(prev => ({ ...prev, status }));
  };

  return {
    filters,
    handleSearch,
    handleCategoryFilter,
    handleStatusFilter
  };
};