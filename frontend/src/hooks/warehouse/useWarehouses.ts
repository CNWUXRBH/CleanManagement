import { useState, useEffect } from 'react';
import { Warehouse } from '../../types';

// Mock data
const mockWarehouses: Warehouse[] = [
  {
    id: 'WH001',
    name: '主仓库',
    location: '上海市浦东新区张江高科技园区',
    capacity: 1000,
  },
  {
    id: 'WH002',
    name: '备用仓库',
    location: '上海市闵行区莘庄工业区',
    capacity: 500,
  },
  {
    id: 'WH003',
    name: '临时仓库',
    location: '上海市嘉定区安亭镇',
    capacity: 200,
  },
];

export const useWarehouses = () => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWarehouses = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWarehouses(mockWarehouses);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWarehouses();
  }, []);

  return { warehouses, isLoading };
};