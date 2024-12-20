import React from 'react';
import { Calendar } from 'lucide-react';

const AnalyticsHeader: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">统计分析</h1>
          <p className="mt-1 text-sm text-gray-500">
            查看库存、消耗和使用情况的统计数据。
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>数据更新于 {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHeader;