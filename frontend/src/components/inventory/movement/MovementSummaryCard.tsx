import React from 'react';
import { ArrowDownCircle, ArrowUpCircle, Scale } from 'lucide-react';
import Card from '../../shared/Card';

interface MovementSummaryCardProps {
  title: string;
  value: number;
  type: 'in' | 'out' | 'balance';
  trend?: {
    value: number;
    isUp: boolean;
  };
}

const MovementSummaryCard: React.FC<MovementSummaryCardProps> = ({
  title,
  value,
  type,
  trend
}) => {
  const getIcon = () => {
    switch (type) {
      case 'in':
        return <ArrowDownCircle className="w-6 h-6 text-green-600" />;
      case 'out':
        return <ArrowUpCircle className="w-6 h-6 text-red-600" />;
      case 'balance':
        return <Scale className="w-6 h-6 text-blue-600" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'in':
        return 'bg-green-50';
      case 'out':
        return 'bg-red-50';
      case 'balance':
        return 'bg-blue-50';
    }
  };

  return (
    <Card>
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${getBgColor()}`}>
          {getIcon()}
        </div>
        <div className="ml-5">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-xl font-semibold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm ${trend.isUp ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isUp ? '↑' : '↓'} {trend.value}%
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MovementSummaryCard;