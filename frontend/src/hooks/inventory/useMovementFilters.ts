import { useState, useCallback } from 'react';
import { InventoryMovement } from '../../types/inventory';

interface MovementFilters {
  search: string;
  type: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export const useMovementFilters = (movements: InventoryMovement[]) => {
  const [filters, setFilters] = useState<MovementFilters>({
    search: '',
    type: '',
    dateRange: {
      start: '',
      end: ''
    }
  });

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = !filters.search || 
      movement.itemId.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesType = !filters.type || movement.type === filters.type;
    
    const matchesDateRange = (!filters.dateRange.start || movement.date >= filters.dateRange.start) &&
      (!filters.dateRange.end || movement.date <= filters.dateRange.end);

    return matchesSearch && matchesType && matchesDateRange;
  });

  const updateFilters = useCallback((newFilters: Partial<MovementFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  return {
    filters,
    filteredMovements,
    updateFilters
  };
};

export default useMovementFilters;