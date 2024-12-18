import React from 'react';
import { Search } from 'lucide-react';

interface AlertFiltersProps {
  onSearch: (query: string) => void;
  onTypeFilter: (type: string) => void;
  onStatusFilter: (status: 'all' | 'unread' | 'read') => void;
}

const AlertFilters: React.FC<AlertFiltersProps> = ({
  onSearch,
  onTypeFilter,
  onStatusFilter
}) => {
  return (
    <div className="mb-6 grid grid-cols-3 gap-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
            leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 
            focus:border-blue-500 sm:text-sm"
          placeholder="搜索预警信息..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <select
        className="block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        onChange={(e) => onTypeFilter(e.target.value)}
      >
        <option value="">所有类型</option>
        <option value="low_stock">库存不足</option>
        <option value="expiring">即将过期</option>
        <option value="consumption">消耗异常</option>
      </select>

      <select
        className="block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        onChange={(e) => onStatusFilter(e.target.value as 'all' | 'unread' | 'read')}
      >
        <option value="all">所有状态</option>
        <option value="unread">未读</option>
        <option value="read">已读</option>
      </select>
    </div>
  );
};

export default AlertFilters;