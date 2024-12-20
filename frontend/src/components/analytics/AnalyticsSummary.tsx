import React from 'react';
import { Package, TrendingUp, TrendingDown, Users } from 'lucide-react';
import Card from '../shared/Card';

const AnalyticsSummary: React.FC = () => {
  // Mock data
  const summaryData = {
    totalItems: 1250,
    totalValue: 125000,
    monthlyConsumption: 3200,
    activeDepartments: 8
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-blue-100">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">库存总量</p>
            <p className="text-2xl font-semibold text-gray-900">{summaryData.totalItems}</p>
            <p className="text-sm text-gray-500">件</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-green-100">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">库存总值</p>
            <p className="text-2xl font-semibold text-gray-900">
              ¥{summaryData.totalValue.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">元</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-yellow-100">
            <TrendingDown className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">月消耗量</p>
            <p className="text-2xl font-semibold text-gray-900">
              {summaryData.monthlyConsumption}
            </p>
            <p className="text-sm text-gray-500">件/月</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center">
          <div className="p-3 rounded-lg bg-purple-100">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500">使用部门</p>
            <p className="text-2xl font-semibold text-gray-900">
              {summaryData.activeDepartments}
            </p>
            <p className="text-sm text-gray-500">个</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsSummary;