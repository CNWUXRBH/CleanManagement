// Add new types for alerts
export interface InventoryAlert {
  id: string;
  type: 'low_stock' | 'expiring' | 'consumption';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  itemId?: string;
  level: 'info' | 'warning' | 'error';
}

export interface AlertFilters {
  search: string;
  type: string;
  status: 'all' | 'unread' | 'read';
}