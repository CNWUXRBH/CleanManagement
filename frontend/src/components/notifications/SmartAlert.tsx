import React from 'react';
import {
  AlertTriangle,
  ShoppingCart,
  Clock,
  Wrench,
  ChevronRight,
  Bell,
  X
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'stock' | 'expiry' | 'maintenance' | 'procurement';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface SmartAlertProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

const SmartAlert: React.FC<SmartAlertProps> = ({ alerts, onDismiss }) => {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'stock':
        return <AlertTriangle className="w-5 h-5" />;
      case 'procurement':
        return <ShoppingCart className="w-5 h-5" />;
      case 'expiry':
        return <Clock className="w-5 h-5" />;
      case 'maintenance':
        return <Wrench className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getAlertStyles = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-100';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'low':
        return 'bg-blue-50 text-blue-700 border-blue-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const getIconStyles = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  const getActionStyles = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 hover:text-red-700';
      case 'medium':
        return 'text-yellow-600 hover:text-yellow-700';
      case 'low':
        return 'text-blue-600 hover:text-blue-700';
      default:
        return 'text-gray-600 hover:text-gray-700';
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`relative flex items-start p-4 rounded-lg border ${getAlertStyles(
            alert.priority
          )} transition-all duration-200 hover:shadow-sm group`}
        >
          <div className={`flex-shrink-0 ${getIconStyles(alert.priority)} mr-3`}>
            {getAlertIcon(alert.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">{alert.title}</h4>
              <button
                onClick={() => onDismiss(alert.id)}
                className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-1 text-sm opacity-90">{alert.description}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs opacity-75">{alert.timestamp}</span>
              {alert.action && (
                <button
                  onClick={alert.action.onClick}
                  className={`inline-flex items-center text-sm font-medium ${getActionStyles(
                    alert.priority
                  )} group`}
                >
                  {alert.action.label}
                  <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SmartAlert; 