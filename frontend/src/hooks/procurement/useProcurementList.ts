import { useState, useEffect } from 'react';
import { ProcurementOrder } from '../../types';

// Mock data - In a real app, this would come from an API
const mockOrders: ProcurementOrder[] = [
  {
    id: '1',
    orderNumber: 'PO2024030001',
    requestDate: '2024-03-01',
    department: '清洁部',
    totalAmount: 2580.50,
    status: 'pending',
    items: [
      { id: '1', name: '洗手液', quantity: 100, price: 12.5 },
      { id: '2', name: '抹布', quantity: 200, price: 3.5 },
    ]
  },
  {
    id: '2',
    orderNumber: 'PO2024030002',
    requestDate: '2024-03-02',
    department: '后勤部',
    totalAmount: 1850.00,
    status: 'approved',
    items: [
      { id: '3', name: '清洁剂', quantity: 50, price: 25.0 },
      { id: '4', name: '拖把', quantity: 20, price: 35.0 },
    ]
  }
];

interface Filters {
  search: string;
  status: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export const useProcurementList = () => {
  const [orders, setOrders] = useState<ProcurementOrder[]>([]);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    status: '',
    dateRange: { start: '', end: '' },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders(mockOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = !filters.search || 
      order.orderNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
      order.department.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesStatus = !filters.status || order.status === filters.status;
    
    const matchesDateRange = (!filters.dateRange.start || order.requestDate >= filters.dateRange.start) &&
      (!filters.dateRange.end || order.requestDate <= filters.dateRange.end);

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const approveOrder = async (id: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: 'approved' } : order
    ));
  };

  const rejectOrder = async (id: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: 'rejected' } : order
    ));
  };

  return {
    orders: filteredOrders,
    isLoading,
    filters,
    updateFilters,
    approveOrder,
    rejectOrder,
  };
};

export default useProcurementList;