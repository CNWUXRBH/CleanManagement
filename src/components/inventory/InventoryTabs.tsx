import React from 'react';
import { Package, BarChart3, AlertTriangle, Settings, ClipboardCheck } from 'lucide-react';

interface InventoryTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const InventoryTabs: React.FC<InventoryTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'list', label: '库存列表', icon: <Package className="w-4 h-4" /> },
    { id: 'adjustment', label: '库存盘点', icon: <ClipboardCheck className="w-4 h-4" /> },
    { id: 'statistics', label: '统计分析', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'alerts', label: '库存预警', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'settings', label: '系统设置', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <nav className="flex space-x-4 mb-6">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium
            ${activeTab === tab.id
              ? 'bg-blue-50 text-blue-700'
              : 'text-gray-500 hover:text-gray-700'
            }`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default InventoryTabs;