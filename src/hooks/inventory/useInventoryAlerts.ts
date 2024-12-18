import { useState, useEffect } from 'react';
import { InventoryAlert, AlertFilters } from '../../types/inventory';

export const useInventoryAlerts = () => {
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [filters, setFilters] = useState<AlertFilters>({
    search: '',
    type: '',
    status: 'all'
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockAlerts: InventoryAlert[] = [
          {
            id: '1',
            type: 'low_stock',
            title: '库存不足提醒',
            message: '洗手液库存低于最小库存量',
            timestamp: new Date().toISOString(),
            isRead: false,
            itemId: 'ITEM001',
            level: 'warning'
          },
          {
            id: '2',
            type: 'expiring',
            title: '过期提醒',
            message: '5件清洁剂将在30天内过期',
            timestamp: new Date().toISOString(),
            isRead: false,
            itemId: 'ITEM002',
            level: 'error'
          }
        ];
        
        setAlerts(mockAlerts);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = !filters.search || 
      alert.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      alert.message.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesType = !filters.type || alert.type === filters.type;
    
    const matchesStatus = filters.status === 'all' || 
      (filters.status === 'unread' ? !alert.isRead : alert.isRead);

    return matchesSearch && matchesType && matchesStatus;
  });

  const markAsRead = async (id: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setAlerts(alerts.map(alert =>
        alert.id === id ? { ...alert, isRead: true } : alert
      ));
      return true;
    } catch (error) {
      console.error('Error marking alert as read:', error);
      return false;
    }
  };

  const markAllAsRead = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setAlerts(alerts.map(alert => ({ ...alert, isRead: true })));
      return true;
    } catch (error) {
      console.error('Error marking all alerts as read:', error);
      return false;
    }
  };

  const updateFilters = (newFilters: Partial<AlertFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return {
    alerts: filteredAlerts,
    isLoading,
    markAsRead,
    markAllAsRead,
    updateFilters,
    filters
  };
};

export default useInventoryAlerts;