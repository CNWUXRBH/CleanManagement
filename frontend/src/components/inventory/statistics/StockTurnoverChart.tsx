import React from 'react';
import Card from '../../shared/Card';
import { TrendingUp } from 'lucide-react';

interface StockTurnoverChartProps {
  turnoverRate: number;
  monthlyData: {
    month: string;
    rate: number;
  }[];
}

const StockTurnoverChart: React.FC<StockTurnoverChartProps> = ({
  turnoverRate,
  monthlyData
}) => {
  const maxRate = Math.max(...monthlyData.map(d => d.rate));

  return (
    <Card title="库存周转率">
      <div className="space-y-6">
        <div className="flex items-center">
          <div className="p-3 bg-indigo-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm text-gray-500">当前周转率</p>
            <p className="text-2xl font-semibold text-gray-900">
              {turnoverRate.toFixed(1)}
            </p>
          </div>
        </div>

        <div className="relative h-40">
          <div className="absolute inset-0 flex items-end space-x-2">
            {monthlyData.map((data, index) => (
              <div
                key={index}
                className="flex-1 bg-indigo-100 rounded-t"
                style={{
                  height: `${(data.rate / maxRate) * 100}%`,
                }}
              >
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-gray-500">
                  {data.month}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StockTurnoverChart;