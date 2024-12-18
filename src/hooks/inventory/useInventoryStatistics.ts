import { useState, useEffect } from 'react';
import { Item } from '../../types';

interface InventoryStatistics {
  totalValue: number;
  valueByCategory: {
    category: string;
    value: number;
  }[];
  stockLevels: {
    normalStock: number;
    lowStock: number;
    outOfStock: number;
  };
  topItems: (Item & { totalValue: number })[];
  turnoverRate: number;
  monthlyTurnover: {
    month: string;
    rate: number;
  }[];
}

export const useInventoryStatistics = (items: Item[]) => {
  const [statistics, setStatistics] = useState<InventoryStatistics>({
    totalValue: 0,
    valueByCategory: [],
    stockLevels: {
      normalStock: 0,
      lowStock: 0,
      outOfStock: 0
    },
    topItems: [],
    turnoverRate: 0,
    monthlyTurnover: []
  });

  useEffect(() => {
    const calculateStatistics = () => {
      // Calculate total value and value by category
      const totalValue = items.reduce((sum, item) => 
        sum + (item.currentStock * item.price), 0
      );

      const valueByCategory = Object.entries(
        items.reduce((acc, item) => {
          const category = item.category;
          const value = item.currentStock * item.price;
          acc[category] = (acc[category] || 0) + value;
          return acc;
        }, {} as Record<string, number>)
      ).map(([category, value]) => ({ category, value }));

      // Calculate stock levels
      const stockLevels = {
        normalStock: items.filter(item => item.currentStock > item.minStock).length,
        lowStock: items.filter(item => 
          item.currentStock > 0 && item.currentStock <= item.minStock
        ).length,
        outOfStock: items.filter(item => item.currentStock === 0).length
      };

      // Calculate top items by value
      const topItems = items
        .map(item => ({
          ...item,
          totalValue: item.currentStock * item.price
        }))
        .sort((a, b) => b.totalValue - a.totalValue)
        .slice(0, 10);

      // Mock turnover data
      const turnoverRate = 3.2;
      const monthlyTurnover = [
        { month: '1月', rate: 2.8 },
        { month: '2月', rate: 3.0 },
        { month: '3月', rate: 3.2 }
      ];

      setStatistics({
        totalValue,
        valueByCategory,
        stockLevels,
        topItems,
        turnoverRate,
        monthlyTurnover
      });
    };

    calculateStatistics();
  }, [items]);

  return statistics;
};

export default useInventoryStatistics;