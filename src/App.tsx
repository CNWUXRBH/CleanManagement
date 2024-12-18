import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import InventoryPage from './pages/InventoryPage';
import WarehousePage from './pages/WarehousePage';
import SupplierPage from './pages/SupplierPage';
import ProcurementPage from './pages/ProcurementPage';
import DepartmentPage from './pages/DepartmentPage';
import AnalyticsPage from './pages/AnalyticsPage';
import NotificationToast from './components/shared/NotificationToast';
import GlobalErrorBoundary from './components/shared/GlobalErrorBoundary';
import LoadingSpinner from './components/shared/LoadingSpinner';
import useStore from './store';

function App() {
  const [activeSection, setActiveSection] = useState('inventory');
  const isLoading = useStore(state => state.isLoading);

  const renderContent = () => {
    switch (activeSection) {
      case 'inventory':
        return <InventoryPage />;
      case 'warehouse':
        return <WarehousePage />;
      case 'suppliers':
        return <SupplierPage />;
      case 'procurement':
        return <ProcurementPage />;
      case 'departments':
        return <DepartmentPage />;
      case 'analytics':
        return <AnalyticsPage />;
      default:
        return (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">欢迎使用保洁耗品耗材管理系统</h3>
              <p className="text-gray-600">
                请从左侧菜单选择要管理的功能模块。系统提供完整的耗材全生命周期管理，
                包括库存管理、采购管理、领用管理等功能。
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <GlobalErrorBoundary>
      <div className="flex h-screen bg-gray-50">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <div className="flex-1 flex flex-col">
          <Header onNotificationClick={() => {}} />
          <main className="flex-1 overflow-auto relative">
            {isLoading && <LoadingSpinner fullScreen />}
            {renderContent()}
          </main>
        </div>
        <NotificationToast />
      </div>
    </GlobalErrorBoundary>
  );
}

export default App;