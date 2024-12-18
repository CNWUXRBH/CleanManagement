import React from 'react';
import Button from '../shared/Button';
import { FileDown, Calendar } from 'lucide-react';

const AnalyticsHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">统计分析</h1>
        <p className="mt-1 text-sm text-gray-500">
          查看物资使用趋势、库存分析和部门消耗统计。
        </p>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-400" />
          <select
            className="block w-40 rounded-md border-gray-300 shadow-sm 
              focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          >
            <option value="7">近7天</option>
            <option value="30">近30天</option>
            <option value="90">近90天</option>
            <option value="365">近一年</option>
          </select>
        </div>

        <Button
          variant="secondary"
          icon={<FileDown className="w-4 h-4" />}
          onClick={() => console.log('Export analytics')}
        >
          导出报告
        </Button>
      </div>
    </div>
  );
}

export default AnalyticsHeader;