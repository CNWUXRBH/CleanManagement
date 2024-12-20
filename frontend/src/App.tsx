import React, { useState, Suspense } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/shared/Toast';
import LoadingSpinner from './components/shared/LoadingSpinner';
import GlobalErrorBoundary from './components/shared/GlobalErrorBoundary';
import useStore from './store';
import { LayoutDashboard, ShoppingCart, FileText, AlertTriangle, ChevronRight } from 'lucide-react';

// Lazy load pages
const InventoryPage = React.lazy(() => import('./pages/InventoryPage'));
const WarehousePage = React.lazy(() => import('./pages/WarehousePage'));
const SupplierPage = React.lazy(() => import('./pages/SupplierPage'));
const ProcurementPage = React.lazy(() => import('./pages/ProcurementPage'));
const DepartmentPage = React.lazy(() => import('./pages/DepartmentPage'));
const AnalyticsPage = React.lazy(() => import('./pages/AnalyticsPage'));
const RequisitionPage = React.lazy(() => import('./pages/RequisitionPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));
const ProfessionalServicesPage = React.lazy(() => import('./pages/ProfessionalServicesPage'));

function App() {
  const [activeSection, setActiveSection] = useState('inventory');
  
  const isLoading = useStore.use.isLoading();
  const toast = useStore.use.toast();
  const clearToast = useStore.use.clearToast();

  const handleNotificationClick = () => {
    // TODO: 实现通知点击处理
    console.log('Notification clicked');
  };

  const renderContent = () => {
    const content = (
      <Suspense fallback={<LoadingSpinner />}>
        {(() => {
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
            case 'requisition':
              return <RequisitionPage />;
            case 'analytics':
              return <AnalyticsPage />;
            case 'settings':
              return <SettingsPage />;
            case 'professional-services':
              return <ProfessionalServicesPage />;
            default:
              return (
                <div className="p-6 max-w-7xl mx-auto">
                  {/* 欢迎卡片 */}
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-8 text-white mb-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
                    <div className="relative z-10 max-w-4xl mx-auto">
                      <h2 className="text-3xl font-bold mb-4">欢迎使用保洁耗品耗材管理系统</h2>
                      <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                        本系统提供完整的耗材全生命周期管理，帮助您高效管理清洁用品库存、采购和使用。
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <button
                          onClick={() => setActiveSection('inventory')}
                          className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition-all duration-200 shadow-sm"
                        >
                          开始使用
                        </button>
                        <button
                          onClick={() => setActiveSection('analytics')}
                          className="bg-blue-500 bg-opacity-20 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-opacity-30 transition-all duration-200 backdrop-blur-sm"
                        >
                          查看报表
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 快��操作区��� */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 group">
                      <div className="flex items-start">
                        <div className="p-3 bg-blue-100 rounded-lg group-hover:scale-110 transition-transform duration-200">
                          <LayoutDashboard className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">库存管理</h3>
                          <p className="text-gray-600 mb-4">实时监控库存状态，及时补充耗材</p>
                          <button
                            onClick={() => setActiveSection('inventory')}
                            className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center group"
                          >
                            查看库存
                            <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 group">
                      <div className="flex items-start">
                        <div className="p-3 bg-green-100 rounded-lg group-hover:scale-110 transition-transform duration-200">
                          <ShoppingCart className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">采购管理</h3>
                          <p className="text-gray-600 mb-4">处理采购申请，跟踪订单状态</p>
                          <button
                            onClick={() => setActiveSection('procurement')}
                            className="text-green-600 hover:text-green-700 font-medium inline-flex items-center group"
                          >
                            去采购
                            <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200 group">
                      <div className="flex items-start">
                        <div className="p-3 bg-purple-100 rounded-lg group-hover:scale-110 transition-transform duration-200">
                          <FileText className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">领用管理</h3>
                          <p className="text-gray-600 mb-4">处理物品领用申请，记录使用情况</p>
                          <button
                            onClick={() => setActiveSection('requisition')}
                            className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center group"
                          >
                            去处理
                            <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 待办事项 */}
                  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      待办事项
                      <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-600 rounded-full">2 项待处理</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg group hover:bg-red-100 transition-colors duration-200">
                        <div className="flex items-center">
                          <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                          <span className="text-red-700">5 个物品库存不足</span>
                        </div>
                        <button
                          onClick={() => setActiveSection('inventory')}
                          className="text-red-600 hover:text-red-700 font-medium inline-flex items-center group"
                        >
                          立即处理
                          <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg group hover:bg-yellow-100 transition-colors duration-200">
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-yellow-500 mr-3" />
                          <span className="text-yellow-700">3 个待审批申请</span>
                        </div>
                        <button
                          onClick={() => setActiveSection('requisition')}
                          className="text-yellow-600 hover:text-yellow-700 font-medium inline-flex items-center group"
                        >
                          去审批
                          <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
          }
        })()}
      </Suspense>
    );

    return content;
  };

  return (
    <GlobalErrorBoundary>
      <div className="min-h-screen bg-gray-100">
        <div className="flex h-screen overflow-hidden">
          <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header onNotificationClick={handleNotificationClick} />
            <main className="flex-1 overflow-auto bg-gray-50 relative">
              {isLoading && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-50">
                  <LoadingSpinner />
                </div>
              )}
              <div className="container mx-auto">
                {renderContent()}
              </div>
            </main>
          </div>
        </div>

        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={clearToast}
          />
        )}
      </div>
    </GlobalErrorBoundary>
  );
}

export default App;