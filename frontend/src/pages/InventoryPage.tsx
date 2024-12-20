import React, { useState } from 'react';
import InventoryHeader from '../components/inventory/InventoryHeader';
import InventoryTabs from '../components/inventory/InventoryTabs';
import InventoryList from '../components/inventory/InventoryList';
import InventoryAdjustment from '../components/inventory/adjustment/InventoryAdjustment';
import InventoryStatistics from '../components/inventory/statistics/InventoryStatistics';
import InventoryAlerts from '../components/inventory/alerts/InventoryAlerts';
import InventorySettings from '../components/inventory/settings/InventorySettings';
import ImportModal from '../components/inventory/import/ImportModal';
import useInventoryState from '../hooks/inventory/useInventoryState';

const InventoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('list');
  const { 
    items, 
    itemsLoading, 
    statistics,
    showImportModal,
    handleImport,
    handleExport,
    setShowImportModal
  } = useInventoryState();

  const renderContent = () => {
    switch (activeTab) {
      case 'adjustment':
        return <InventoryAdjustment />;
      case 'statistics':
        return <InventoryStatistics statistics={statistics} />;
      case 'alerts':
        return <InventoryAlerts />;
      case 'settings':
        return <InventorySettings />;
      default:
        return <InventoryList items={items} isLoading={itemsLoading} />;
    }
  };

  return (
    <div className="p-6">
      <InventoryHeader 
        onAddItem={() => console.log('Add new item')}
        onImport={() => setShowImportModal(true)}
        onExport={handleExport}
      />

      <InventoryTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {renderContent()}

      {showImportModal && (
        <ImportModal
          onClose={() => setShowImportModal(false)}
          onImport={handleImport}
        />
      )}
    </div>
  );
};

export default InventoryPage;