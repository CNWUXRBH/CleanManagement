import { useState, useEffect } from 'react';
import { Supplier } from '../../types';

// Mock data
const mockSuppliers: Supplier[] = [
  {
    id: 'SUP001',
    name: '清洁之星供应链',
    contact: '张经理',
    phone: '13800138000',
    email: 'contact@cleanstar.com',
    address: '上海市浦东新区张江高科技园区',
  },
  {
    id: 'SUP002',
    name: '绿色环保用品有限公司',
    contact: '李总',
    phone: '13900139000',
    email: 'contact@greenclean.com',
    address: '广州市天河区科技园',
  },
];

interface SupplierFilters {
  search: string;
  category: string;
  status: string;
}

export const useSuppliers = (filters: SupplierFilters) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchSuppliers = async () => {
      setIsLoading(true);
      try {
        // Filter suppliers based on search query
        const filteredSuppliers = mockSuppliers.filter(supplier => 
          supplier.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          supplier.contact.toLowerCase().includes(filters.search.toLowerCase())
        );
        
        setSuppliers(filteredSuppliers);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuppliers();
  }, [filters]);

  return { suppliers, isLoading };
};