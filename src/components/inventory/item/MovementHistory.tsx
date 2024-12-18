import React, { useState } from 'react';
import { InventoryMovement } from '../../../types/inventory';
import MovementList from '../movement/MovementList';
import MovementSummary from '../movement/MovementSummary';
import { Search, Calendar } from 'lucide-react';

interface MovementHistoryProps {
  itemId: string;
}

const MovementHistory: React.FC<MovementHistoryProps> = ({ itemId }) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const mockMovements: InventoryMovement[] = [
    {
      id: '1',
      itemId,
      type: 'in',
      reason: 'purchase',
      quantity: 100,
      date: '2024-03-01',
      operatorId: 'USER001',
      note: '采购入库'
    },
    {
      id: '2',
      itemId,
      type: 'out',
      reason: 'requisition',
      quantity: 20,
      date: '2024-03-02',
      operatorId: 'USER002',
      note: '部门领用'
    }
  ];

  const summary = {
    totalIn: 150,
    totalOut: 65,
    balance: 85
  };

  return (
    <div className="space-y-6">
      <MovementSummary summary={summary} />

      <div className="flex space-x-4 mb-6">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
              leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 
              focus:border-blue-500 sm:text-sm"
            placeholder="搜索记录..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <input
            type="date"
            value={dateRange.start}
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
            className="block w-40 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 
              focus:border-blue-500 sm:text-sm"
          />
          <span className="text-gray-500">至</span>
          <input
            type="date"
            value={dateRange.end}
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
            className="block w-40 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 
              focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <MovementList movements={mockMovements} />
    </div>
  );
}

export default MovementHistory;