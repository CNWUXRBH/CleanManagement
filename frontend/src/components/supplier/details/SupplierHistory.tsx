import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import { ProcurementOrder } from '../../../types';

interface SupplierHistoryProps {
  supplierId: string;
}

const SupplierHistory: React.FC<SupplierHistoryProps> = ({ supplierId }) => {
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const mockOrders: ProcurementOrder[] = [
    {
      id: '1',
      orderNumber: 'PO202403001',
      requestDate: '2024-03-01',
      department: '清洁部',
      totalAmount: 12500,
      status: 'completed',
      items: []
    },
    {
      id: '2',
      orderNumber: 'PO202403002',
      requestDate: '2024-03-02',
      department: '后勤部',
      totalAmount: 8600,
      status: 'completed',
      items: []
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
              leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 
              focus:border-blue-500 sm:text-sm"
            placeholder="搜索订单..."
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

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                订单编号
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                日期
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                部门
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                金额
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状态
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.orderNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.requestDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ¥{order.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    已完成
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplierHistory;