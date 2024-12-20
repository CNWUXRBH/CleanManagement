import { useState, useEffect } from 'react';
import { Category } from '../../types/basicData';

// Mock data
const mockCategories: Category[] = [
  {
    id: 'CAT001',
    name: '清洁用品',
    code: 'CLEAN',
    description: '各类清洁用品',
    isActive: true
  },
  {
    id: 'CAT002',
    name: '纸制品',
    code: 'PAPER',
    description: '各类纸制品',
    isActive: true
  }
];

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCategories(mockCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const addCategory = async (category: Omit<Category, 'id'>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newCategory = {
        ...category,
        id: \`CAT\${Date.now()}\`
      };
      setCategories([...categories, newCategory]);
      return true;
    } catch (error) {
      console.error('Error adding category:', error);
      return false;
    }
  };

  const updateCategory = async (id: string, updates: Partial<Category>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCategories(categories.map(cat => 
        cat.id === id ? { ...cat, ...updates } : cat
      ));
      return true;
    } catch (error) {
      console.error('Error updating category:', error);
      return false;
    }
  };

  const deleteCategory = async (id: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCategories(categories.filter(cat => cat.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  };

  return {
    categories,
    isLoading,
    addCategory,
    updateCategory,
    deleteCategory
  };
};

export default useCategories;