import React from 'react';
import { Search, Calendar } from 'lucide-react';

interface MovementFiltersProps {
  onSearch: (query: string) => void;
  onTypeFilter: (type: string) => void;
  onDateRangeFilter: (start: string, end: string) => void;
}

const MovementFilters: React.FC<MovementFiltersProps> = ({
  onSearch,
  onTypeFilter,
  onDateRangeFilter
}) => {
  return (
    <div className="mb-6 grid grid-cols-4 gap-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
            leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 
            focus:border-blue-500 sm:text-sm"
          placeholder="搜索移动记录..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <select
        className="block w-full rounded-md border-gray-300 shadow-sm 
          focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        onChange={(e) => onTypeFilter(e.target.value)}
      >
        <option value="">所有类型</option>
        <option value="in">入库</option>
        <option value="out">出库</option>
      </select>

      <div className="flex items-center space-x-2">
        <Calendar className="h-5 w-5 text-gray-400" />
        <input
          type="date"
          className="block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          onChange={(e) => onDateRangeFilter(e.target.value, '')}
        />
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-gray-500">至</span>
        <input
          type="date"
          className="block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          onChange={(e) => onDateRangeFilter('', e.target.value)}
        />
      </div>
    </div>
  );
};

export default MovementFilters;