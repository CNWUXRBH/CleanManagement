import React from 'react';
import { Search, Filter } from 'lucide-react';

interface SupplierFiltersProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string) => void;
  onStatusFilter: (status: string) => void;
}

const SupplierFilters: React.FC<SupplierFiltersProps> = ({
  onSearch,
  onCategoryFilter,
  onStatusFilter,
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
          placeholder="搜索供应商..."
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <select
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none 
          focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        onChange={(e) => onCategoryFilter(e.target.value)}
      >
        <option value="">所有类别</option>
        <option value="cleaning">清洁用品</option>
        <option value="paper">纸制品</option>
        <option value="chemical">化学用品</option>
        <option value="tools">清洁工具</option>
      </select>

      <select
        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none 
          focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        onChange={(e) => onStatusFilter(e.target.value)}
      >
        <option value="">所有状态</option>
        <option value="active">合作中</option>
        <option value="inactive">已终止</option>
        <option value="pending">待审核</option>
      </select>
    </div>
  );
};

export default SupplierFilters;