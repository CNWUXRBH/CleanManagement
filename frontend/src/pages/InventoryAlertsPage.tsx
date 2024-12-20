import React from 'react';
import AlertSummary from '../components/inventory/alerts/AlertSummary';
import AlertFilters from '../components/inventory/alerts/AlertFilters';
import AlertList from '../components/inventory/alerts/AlertList';
import useInventoryAlerts from '../hooks/inventory/useInventoryAlerts';
import Button from '../components/shared/Button';
import { Bell } from 'lucide-react';

const InventoryAlertsPage: React.FC = () => {
  const {
    alerts,
    isLoading,
    markAsRead,
    markAllAsRead,
    updateFilters
  } = useInventoryAlerts();

  const alertCounts = {
    lowStock: alerts.filter(a => a.type === 'low_stock').length,
    expiring: alerts.filter(a => a.type === 'expiring').length,
    consumption: alerts.filter(a => a.type === 'consumption').length
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">库存预警</h1>
          <p className="mt-1 text-sm text-gray-500">
            查看和管理库存不足、即将过期和异常消耗等预警信息。
          </p>
        </div>
        <Button
          variant="secondary"
          icon={<Bell className="w-4 h-4" />}
          onClick={markAllAsRead}
        >
          全部标记为已读
        </Button>
      </div>

      <AlertSummary counts={alertCounts} />

      <div className="mt-6">
        <AlertFilters
          onSearch={(query) => updateFilters({ search: query })}
          onTypeFilter={(type) => updateFilters({ type })}
          onStatusFilter={(status) => updateFilters({ status })}
        />

        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">加载预警信息...</p>
          </div>
        ) : (
          <AlertList alerts={alerts} onMarkAsRead={markAsRead} />
        )}
      </div>
    </div>
  );
};

export default InventoryAlertsPage;