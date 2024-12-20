import { useState, useEffect } from 'react';
import { Item } from '../../types';

interface InventoryStats {
  totalItems: number;
  lowStockItems: number;
  outOfStockItems: number;
  totalValue: number;
  monthlyConsumption: number;
}

export const useInventoryStats = (items: Item[]) => {
  const [stats, setStats] = useState<InventoryStats>({
    totalItems: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
    totalValue: 0,
    monthlyConsumption: 0
  });

  useEffect(() => {
    const calculateStats = () => {
      const newStats = {
        totalItems: items.length,
        lowStockItems: items.filter(item => 
          item.currentStock > 0 && item.currentStock <= item.minStock
        ).length,
        outOfStockItems: items.filter(item => item.currentStock === 0).length,
        totalValue: items.reduce((sum, item) => 
          sum + (item.currentStock * item.price), 0
        ),
        monthlyConsumption: 1250 // Mock data
      };
      setStats(newStats);
    };

    calculateStats();
  }, [items]);

  return stats;
};

export default useInventoryStats;