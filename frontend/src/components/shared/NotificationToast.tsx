import React from 'react';
import { X, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';
import useGlobalNotification from '../../hooks/useGlobalNotification';

const NotificationToast: React.FC = () => {
  const { notifications, removeNotification } = useGlobalNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-0 right-0 p-6 space-y-4 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto 
            ring-1 ring-black ring-opacity-5 overflow-hidden ${
              notification.type === 'success' ? 'bg-green-50' :
              notification.type === 'error' ? 'bg-red-50' :
              notification.type === 'warning' ? 'bg-yellow-50' :
              'bg-blue-50'
            }`}
        >
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {notification.type === 'success' && <CheckCircle className="h-5 w-5 text-green-400" />}
                {notification.type === 'error' && <XCircle className="h-5 w-5 text-red-400" />}
                {notification.type === 'warning' && <AlertTriangle className="h-5 w-5 text-yellow-400" />}
                {notification.type === 'info' && <Info className="h-5 w-5 text-blue-400" />}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">
                  {notification.message}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={() => removeNotification(notification.id)}
                >
                  <span className="sr-only">关闭</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;