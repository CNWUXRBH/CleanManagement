import React from 'react';
import Card from '../shared/Card';
import { Package, Scissors, Tool, Boxes } from 'lucide-react';

interface CategoryDistributionProps {
  categories: {
    name: string;
    percentage: number;
    amount: string;
    icon: 'cleaning' | 'paper' | 'tools' | 'other';
    color: string;
  }[];
}

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ categories }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'cleaning':
        return <Package className="w-5 h-5" />;
      case 'paper':
        return <Scissors className="w-5 h-5" />;
      case 'tools':
        return <Tool className="w-5 h-5" />;
      default:
        return <Boxes className="w-5 h-5" />;
    }
  };

  return (
    <Card title="物资类别分布">
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center">
            <div className={`p-2 rounded-lg ${category.color.replace('500', '100')} mr-3`}>
              {getIcon(category.icon)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{category.name}</span>
                <span className="text-sm text-gray-500">{category.amount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${category.color} h-2 rounded-full`}
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CategoryDistribution;