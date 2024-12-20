import { useState, useEffect } from 'react';

interface RequisitionItem {
  id: string;
  itemId: string;
  name: string;
  quantity: number;
  unit: string;
}

interface Requisition {
  id: string;
  requisitionNumber: string;
  requestDate: string;
  department: string;
  items: RequisitionItem[];
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requesterId: string;
  approverId?: string;
  approvalDate?: string;
}

const useRequisitions = () => {
  const [requisitions, setRequisitions] = useState<Requisition[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequisitions = async () => {
      setIsLoading(true);
      try {
        // 模拟 API 调用
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

  const addRequisition = async (data: any) => {
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newRequisition: Requisition = {
        id: Date.now().toString(),
        requisitionNumber: `REQ${new Date().getTime()}`,
        requestDate: new Date().toISOString(),
        department: data.department,
        items: data.items,
        status: 'pending',
        requesterId: 'CURRENT_USER'
      };

      setRequisitions(prev => [...prev, newRequisition]);
      return true;
    } catch (error) {
      console.error('Error adding requisition:', error);
      return false;
    }
  };

  const approveRequisition = async (id: string) => {
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRequisitions(prev =>
        prev.map(req =>
          req.id === id
            ? {
                ...req,
                status: 'approved',
                approverId: 'CURRENT_USER',
                approvalDate: new Date().toISOString()
              }
            : req
        )
      );
      return true;
    } catch (error) {
      console.error('Error approving requisition:', error);
      return false;
    }
  };

  const rejectRequisition = async (id: string) => {
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRequisitions(prev =>
        prev.map(req =>
          req.id === id
            ? {
                ...req,
                status: 'rejected',
                approverId: 'CURRENT_USER',
                approvalDate: new Date().toISOString()
              }
            : req
        )
      );
      return true;
    } catch (error) {
      console.error('Error rejecting requisition:', error);
      return false;
    }
  };

  return {
    requisitions,
    isLoading,
    addRequisition,
    approveRequisition,
    rejectRequisition
  };
};

export default useRequisitions;