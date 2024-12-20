import React from 'react';
import { OrderNotification } from '../../../types/procurement';
import { formatRelativeTime } from '../../../utils/date';
import { Bell, CheckCircle, XCircle, MessageSquare, Clock } from 'lucide-react';

interface NotificationListProps {
  notifications: OrderNotification[];
  onMarkAsRead: (id: string) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead,
}) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'approval':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejection':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'comment':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        暂无通知
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={\`p-4 hover:bg-gray-50 \${
            !notification.isRead ? 'bg-blue-50' : ''
          }\`}
          onClick={() => !notification.isRead && onMarkAsRead(notification.id)}
        >
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <time className="text-sm text-gray-500">
                  {formatRelativeTime(new Date(notification.timestamp))}
                </time>
              </div>
              <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;