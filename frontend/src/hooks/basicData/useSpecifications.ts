import { useState, useEffect } from 'react';
import { Specification } from '../../types/basicData';

// Mock data
const mockSpecifications: Specification[] = [
  {
    id: 'SPEC001',
    name: '500ml瓶装',
    code: 'BTL500',
    description: '500ml塑料瓶包装',
    categoryId: 'CAT001',
    attributes: [
      { name: '容量', value: '500ml' },
      { name: '包装', value: '塑料瓶' }
    ],
    isActive: true
  }
];

export const useSpecifications = () => {
  const [specifications, setSpecifications] = useState<Specification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSpecifications = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSpecifications(mockSpecifications);
      } catch (error) {
        console.error('Error fetching specifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecifications();
  }, []);

  const addSpecification = async (spec: Omit<Specification, 'id'>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newSpec = {
        ...spec,
        id: \`SPEC\${Date.now()}\`
      };
      setSpecifications([...specifications, newSpec]);
      return true;
    } catch (error) {
      console.error('Error adding specification:', error);
      return false;
    }
  };

  const updateSpecification = async (id: string, updates: Partial<Specification>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSpecifications(specs => 
        specs.map(spec => spec.id === id ? { ...spec, ...updates } : spec)
      );
      return true;
    } catch (error) {
      console.error('Error updating specification:', error);
      return false;
    }
  };

  const deleteSpecification = async (id: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSpecifications(specs => specs.filter(spec => spec.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting specification:', error);
      return false;
    }
  };

  return {
    specifications,
    isLoading,
    addSpecification,
    updateSpecification,
    deleteSpecification
  };
};

export default useSpecifications;