import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface StockLevelBadgeProps {
  currentStock: number;
  minStock: number;
}

const StockLevelBadge: React.FC<StockLevelBadgeProps> = ({ currentStock, minStock }) => {
  const getStatusConfig = () => {
    if (currentStock === 0) {
      return {
        icon: <XCircle className="w-4 h-4" />,
        text: '库存耗尽',
        className: 'bg-red-100 text-red-800'
      };
    }
    if (currentStock <= minStock) {
      return {
        icon: <AlertTriangle className="w-4 h-4" />,
        text: '库存不足',
        className: 'bg-yellow-100 text-yellow-800'
      };
    }
    return {
      icon: <CheckCircle className="w-4 h-4" />,
      text: '库存充足',
      className: 'bg-green-100 text-green-800'
    };
  };

  const { icon, text, className } = getStatusConfig();

  return (
    <span className={`px-2 py-1 inline-flex items-center space-x-1 text-xs font-semibold rounded-full ${className}`}>
      {icon}
      <span>{text}</span>
    </span>
  );
};

export default StockLevelBadge;