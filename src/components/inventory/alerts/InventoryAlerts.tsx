import React from 'react';
import AlertList from './AlertList';
import AlertFilters from './AlertFilters';
import AlertSummary from './AlertSummary';
import useInventoryAlerts from '../../../hooks/inventory/useInventoryAlerts';

const InventoryAlerts: React.FC = () => {
  const {
    alerts,
    isLoading,
    markAsRead,
    updateFilters
  } = useInventoryAlerts();

  const alertCounts = {
    lowStock: alerts.filter(a => a.type === 'low_stock').length,
    expiring: alerts.filter(a => a.type === 'expiring').length,
    consumption: alerts.filter(a => a.type === 'consumption').length
  };

  return (
    <div className="space-y-6">
      <AlertSummary
        counts={{
          lowStock: alertCounts.lowStock,
          expiring: alertCounts.expiring,
          consumption: alertCounts.consumption
        }}
      />

      <AlertFilters
        onSearch={(query) => updateFilters({ search: query })}
        onTypeFilter={(type) => updateFilters({ type })}
        onStatusFilter={(status) => updateFilters({ status })}
      />

      <AlertList
        alerts={alerts}
        onMarkAsRead={markAsRead}
      />
    </div>
  );
};

export default InventoryAlerts;