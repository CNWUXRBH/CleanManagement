import { useState, useEffect } from 'react';
import { Department } from '../../types';

// Mock data
const mockDepartments: Department[] = [
  {
    id: 'DEP001',
    name: '清洁部',
    manager: '张主管',
    contactNumber: '13800138001',
  },
  {
    id: 'DEP002',
    name: '后勤部',
    manager: '李主管',
    contactNumber: '13800138002',
  },
  {
    id: 'DEP003',
    name: '工程部',
    manager: '王主管',
    contactNumber: '13800138003',
  },
];

export const useDepartments = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setDepartments(mockDepartments);
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return { departments, isLoading };
};