import { useState, useEffect } from 'react';
import { InventoryMovement } from '../../types/inventory';

// Mock data
const mockMovements: InventoryMovement[] = [
  {
    id: '1',
    itemId: '1',
    type: 'in',
    reason: 'purchase',
    quantity: 100,
    date: '2024-03-01',
    operatorId: 'USER001',
    note: '采购入库'
  },
  {
    id: '2',
    itemId: '1',
    type: 'out',
    reason: 'requisition',
    quantity: 20,
    date: '2024-03-02',
    operatorId: 'USER002',
    note: '部门领用'
  }
];

export const useInventoryMovements = (itemId: string) => {
  const [movements, setMovements] = useState<InventoryMovement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovements = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setMovements(mockMovements.filter(m => m.itemId === itemId));
      } catch (error) {
        console.error('Error fetching movements:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovements();
  }, [itemId]);

  const addMovement = async (movement: Omit<InventoryMovement, 'id'>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newMovement = {
        ...movement,
        id: `MOV${Date.now()}`
      };
      setMovements([...movements, newMovement]);
      return true;
    } catch (error) {
      console.error('Error adding movement:', error);
      return false;
    }
  };

  return {
    movements,
    isLoading,
    addMovement
  };
};

export default useInventoryMovements;