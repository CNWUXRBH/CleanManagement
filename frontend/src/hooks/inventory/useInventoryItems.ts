import { useState, useEffect } from 'react';
import { Item } from '../../types';
import { cache } from '../../utils/cache';
import { logger } from '../../utils/logger';
import { measurePerformance } from '../../utils/performance';
import { handleApiError } from '../../utils/errorHandler';

const CACHE_KEY = 'inventory_items';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Mock data
const mockItems: Item[] = [
  {
    id: '1',
    code: 'CL001',
    name: '洗手液',
    category: 'cleaning',
    specification: '500ml/瓶',
    unit: '瓶',
    minStock: 100,
    currentStock: 85,
    supplierId: 'SUP001',
    price: 12.5
  },
  {
    id: '2',
    code: 'CL002',
    name: '抹布',
    category: 'tools',
    specification: '30x30cm',
    unit: '块',
    minStock: 200,
    currentStock: 250,
    supplierId: 'SUP002',
    price: 3.5
  }
];

export const useInventoryItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        await measurePerformance('fetchInventoryItems', async () => {
          // Try to get from cache first
          const cachedItems = cache.get<Item[]>(CACHE_KEY);
          if (cachedItems) {
            setItems(cachedItems);
            return;
          }

          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));
          setItems(mockItems);
          
          // Cache the results
          cache.set(CACHE_KEY, mockItems, CACHE_TTL);
        });
      } catch (error) {
        const appError = handleApiError(error);
        setError(appError.message);
        logger.error('Error fetching inventory items:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  return {
    items,
    isLoading,
    error
  };
};

export default useInventoryItems;