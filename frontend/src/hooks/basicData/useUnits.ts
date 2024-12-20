import { useState, useEffect } from 'react';
import { Unit } from '../../types/basicData';

// Mock data
const mockUnits: Unit[] = [
  {
    id: 'UNIT001',
    name: '个',
    code: 'PCS',
    description: '基本计数单位',
    isBase: true,
    isActive: true
  },
  {
    id: 'UNIT002',
    name: '箱',
    code: 'BOX',
    description: '包装单位',
    isBase: false,
    baseUnitId: 'UNIT001',
    conversionRate: 12,
    isActive: true
  }
];

export const useUnits = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUnits(mockUnits);
      } catch (error) {
        console.error('Error fetching units:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnits();
  }, []);

  const addUnit = async (unit: Omit<Unit, 'id'>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newUnit = {
        ...unit,
        id: \`UNIT\${Date.now()}\`
      };
      setUnits([...units, newUnit]);
      return true;
    } catch (error) {
      console.error('Error adding unit:', error);
      return false;
    }
  };

  const updateUnit = async (id: string, updates: Partial<Unit>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUnits(units.map(unit => 
        unit.id === id ? { ...unit, ...updates } : unit
      ));
      return true;
    } catch (error) {
      console.error('Error updating unit:', error);
      return false;
    }
  };

  const deleteUnit = async (id: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setUnits(units.filter(unit => unit.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting unit:', error);
      return false;
    }
  };

  return {
    units,
    isLoading,
    addUnit,
    updateUnit,
    deleteUnit
  };
};

export default useUnits;