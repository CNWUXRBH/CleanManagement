import { useState, useEffect } from 'react';
import { Requisition } from '../../types/requisition';

export const useRequisitions = () => {
  const [requisitions, setRequisitions] = useState<Requisition[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequisitions = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockRequisitions: Requisition[] = [
          {
            id: '1',
            requisitionNumber: 'REQ202403001',
            requestDate: '2024-03-01',
            department: '清洁部',
            items: [
              { id: '1', itemId: 'ITEM001', name: '洗手液', quantity: 10, unit: '瓶' },
              { id: '2', itemId: 'ITEM002', name: '抹布', quantity: 20, unit: '块' }
            ],
            status: 'pending',
            requesterId: 'USER001'
          },
          {
            id: '2',
            requisitionNumber: 'REQ202403002',
            requestDate: '2024-03-02',
            department: '后勤部',
            items: [
              { id: '3', itemId: 'ITEM003', name: '清洁剂', quantity: 5, unit: '瓶' }
            ],
            status: 'completed',
            requesterId: 'USER002',
            approverId: 'USER003',
            approvalDate: '2024-03-02'
          }
        ];
        
        setRequisitions(mockRequisitions);
      } catch (error) {
        console.error('Error fetching requisitions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequisitions();
  }, []);

  const addRequisition = async (requisition: Omit<Requisition, 'id'>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRequisition: Requisition = {
        id: Date.now().toString(),
        ...requisition
      };
      
      setRequisitions([newRequisition, ...requisitions]);
      return true;
    } catch (error) {
      console.error('Error adding requisition:', error);
      return false;
    }
  };

  return {
    requisitions,
    isLoading,
    addRequisition
  };
};

export default useRequisitions;