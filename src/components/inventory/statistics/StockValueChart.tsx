import React from 'react';
import Card from '../../shared/Card';
import { DollarSign } from 'lucide-react';

interface StockValueChartProps {
  totalValue: number;
  valueByCategory: {
    category: string;
    value: number;
  }[];
}

const StockValueChart: React.FC<StockValueChartProps> = ({ totalValue, valueByCategory }) => {
  const calculatePercentage = (value: number) => {
    return ((value / totalValue) * 100).toFixed(1);
  };

  return (
    <Card title="库存价值分布">
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">库存总值</p>
            <p className="text-2xl font-semibold text-gray-900">
              ¥{totalValue.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {valueByCategory.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">{item.category}</span>
                <span className="text-gray-900">
                  ¥{item.value.toLocaleString()} ({calculatePercentage(item.value)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${calculatePercentage(item.value)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default StockValueChart;