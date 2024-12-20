import React from 'react';
import { AlertTriangle, Package, Calendar, TrendingUp } from 'lucide-react';
import Card from '../../shared/Card';
import { formatRelativeTime } from '../../../utils/date';
import { InventoryAlert } from '../../../types/inventory';

interface AlertListProps {
  alerts: InventoryAlert[];
  onMarkAsRead: (id: string) => void;
}

const AlertList: React.FC<AlertListProps> = ({ alerts, onMarkAsRead }) => {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'low_stock':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'expiring':
        return <Calendar className="w-5 h-5 text-red-500" />;
      case 'consumption':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-500" />;
    }
  };

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        暂无预警信息
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map(alert => (
        <Card key={alert.id} className={!alert.isRead ? 'bg-blue-50' : ''}>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getAlertIcon(alert.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                <time className="text-xs text-gray-500">
                  {formatRelativeTime(new Date(alert.timestamp))}
                </time>
              </div>
              <p className="mt-1 text-sm text-gray-600">{alert.message}</p>
              {!alert.isRead && (
                <button
                  onClick={() => onMarkAsRead(alert.id)}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  标记为已读
                </button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AlertList;