import React, { useState } from 'react';
import { ProcurementOrder } from '../types';
import Card from '../components/shared/Card';
import ProcurementList from '../components/procurement/ProcurementList';
import ListHeader from '../components/procurement/ProcurementList/ListHeader';
import ListFilters from '../components/procurement/ProcurementList/ListFilters';

const ProcurementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mock data
  const orders: ProcurementOrder[] = [
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

  const handleSearch = (query: string) => setSearchQuery(query);
  const handleStatusFilter = (status: string) => setStatusFilter(status);
  const handleDateRangeFilter = (start: string, end: string) => {
    setDateRange({ start, end });
  };

  // Filter orders based on search query, status, and date range
  const filteredOrders = orders.filter(order => {
    const matchesSearch = !searchQuery || 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || order.status === statusFilter;
    
    const matchesDateRange = (!dateRange.start || order.requestDate >= dateRange.start) &&
      (!dateRange.end || order.requestDate <= dateRange.end);

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  return (
    <div className="p-6">
      <ListHeader
        onCreateNew={() => console.log('Create new order')}
        onExport={() => console.log('Export orders')}
      />
      
      <ListFilters
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
        onDateRangeFilter={handleDateRangeFilter}
      />

      <Card>
        <ProcurementList
          orders={filteredOrders}
          onApprove={(id) => console.log('Approve order:', id)}
          onReject={(id) => console.log('Reject order:', id)}
          onView={(id) => console.log('View order:', id)}
        />
      </Card>
    </div>
  );
};

export default ProcurementPage;