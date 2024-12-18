import React from 'react';
import { 
  Package, 
  Warehouse, 
  Users, 
  ShoppingCart,
  ClipboardList,
  BarChart3,
  Settings,
  Building2
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors
      ${active ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </div>
);

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="w-64 bg-white h-screen border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">清洁用品管理系统</h1>
      </div>
      <nav className="py-4">
        <SidebarItem
          icon={<Package className="w-5 h-5" />}
          label="库存管理"
          active={activeSection === 'inventory'}
          onClick={() => onSectionChange('inventory')}
        />
        <SidebarItem
          icon={<Warehouse className="w-5 h-5" />}
          label="仓库管理"
          active={activeSection === 'warehouse'}
          onClick={() => onSectionChange('warehouse')}
        />
        <SidebarItem
          icon={<Users className="w-5 h-5" />}
          label="供应商管理"
          active={activeSection === 'suppliers'}
          onClick={() => onSectionChange('suppliers')}
        />
        <SidebarItem
          icon={<ShoppingCart className="w-5 h-5" />}
          label="采购管理"
          active={activeSection === 'procurement'}
          onClick={() => onSectionChange('procurement')}
        />
        <SidebarItem
          icon={<Building2 className="w-5 h-5" />}
          label="部门管理"
          active={activeSection === 'departments'}
          onClick={() => onSectionChange('departments')}
        />
        <SidebarItem
          icon={<ClipboardList className="w-5 h-5" />}
          label="领用管理"
          active={activeSection === 'requisition'}
          onClick={() => onSectionChange('requisition')}
        />
        <SidebarItem
          icon={<BarChart3 className="w-5 h-5" />}
          label="统计分析"
          active={activeSection === 'analytics'}
          onClick={() => onSectionChange('analytics')}
        />
        <SidebarItem
          icon={<Settings className="w-5 h-5" />}
          label="系统设置"
          active={activeSection === 'settings'}
          onClick={() => onSectionChange('settings')}
        />
      </nav>
    </div>
  );
};

export default Sidebar;