import React from 'react';
import Card from '../shared/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendItem {
  name: string;
  currentStock: number;
  previousStock: number;
  change: number;
}

const StockTrends: React.FC = () => {
  // Mock data
  const trends: TrendItem[] = [
    {
      name: '洗手液',
      currentStock: 280,
      previousStock: 250,
      change: 12
    },
    {
      name: '抹布',
      currentStock: 150,
      previousStock: 180,
      change: -16.7
    },
    {
      name: '清洁剂',
      currentStock: 420,
      previousStock: 380,
      change: 10.5
    },
    {
      name: '垃圾袋',
      currentStock: 800,
      previousStock: 900,
      change: -11.1
    },
    {
      name: '拖把',
      currentStock: 95,
      previousStock: 85,
      change: 11.8
    }
  ];

  return (
    <Card title="库存变化趋势">
      <div className="space-y-4">
        {trends.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500">
                  当前: {item.currentStock}
                </span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm text-gray-500">
                  上月: {item.previousStock}
                </span>
              </div>
            </div>
            <div className={`flex items-center ${
              item.change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {item.change >= 0 ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span className="text-sm font-medium">
                {item.change >= 0 ? '+' : ''}{item.change.toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StockTrends;