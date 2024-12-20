import { useState, useCallback } from 'react';
import { ProcurementOrder } from '../../types';

interface OrderFilters {
  search: string;
  status: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export const useOrderFilters = (orders: ProcurementOrder[]) => {
  const [filters, setFilters] = useState<OrderFilters>({
    search: '',
    status: '',
    dateRange: {
      start: '',
      end: ''
    }
  });

  const setSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }));
  }, []);

  const setStatus = useCallback((status: string) => {
    setFilters(prev => ({ ...prev, status }));
  }, []);

  const setDateRange = useCallback((start: string, end: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: { start, end }
    }));
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = !filters.search || 
      order.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.department.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = !filters.status || order.status === filters.status;
    
    const matchesDateRange = (!filters.dateRange.start || order.requestDate >= filters.dateRange.start) &&
      (!filters.dateRange.end || order.requestDate <= filters.dateRange.end);

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const resetFilters = useCallback(() => {
    setFilters({
      search: '',
      status: '',
      dateRange: {
        start: '',
        end: ''
      }
    });
  }, []);

  return {
    filters,
    filteredOrders,
    setSearch,
    setStatus,
    setDateRange,
    resetFilters
  };
};

export default useOrderFilters;