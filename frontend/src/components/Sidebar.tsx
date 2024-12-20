import React from 'react';
import {
  LayoutDashboard,
  Warehouse,
  Users,
  ShoppingCart,
  Building2,
  FileText,
  BarChart2,
  Settings,
  Droplets,
  ChevronRight,
  HelpCircle,
  Info
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { 
      id: 'inventory', 
      icon: LayoutDashboard, 
      label: '库存管理',
      badge: '12',
      description: '管理清洁用品库存'
    },
    { 
      id: 'warehouse', 
      icon: Warehouse, 
      label: '仓库管理',
      description: '管理仓库和存储位置'
    },
    { 
      id: 'suppliers', 
      icon: Users, 
      label: '供应商管理',
      description: '管理供应商信息'
    },
    { 
      id: 'procurement', 
      icon: ShoppingCart, 
      label: '采购管理',
      badge: '3',
      badgeColor: 'bg-red-100 text-red-600',
      description: '处理采购申请和订单'
    },
    { 
      id: 'departments', 
      icon: Building2, 
      label: '部门管理',
      description: '管理部门和权限'
    },
    { 
      id: 'requisition', 
      icon: FileText, 
      label: '领用管理',
      badge: '5',
      badgeColor: 'bg-yellow-100 text-yellow-600',
      description: '处理物品领用申请'
    },
    { 
      id: 'professional-services', 
      icon: Droplets, 
      label: '专业服务',
      description: '管理专业清洁服务'
    },
    { 
      id: 'analytics', 
      icon: BarChart2, 
      label: '数据分析',
      description: '查看统计报表'
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: '系统设置',
      description: '配置系统参数'
    },
  ];

  // 根据功能分组
  const menuGroups = {
    main: menuItems.slice(0, 3),
    management: menuItems.slice(3, 7),
    system: menuItems.slice(7)
  };

  const renderMenuGroup = (items: typeof menuItems, title?: string) => (
    <div className="space-y-1">
      {title && (
        <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          {title}
        </h3>
      )}
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        
        return (
          <div key={item.id} className="group relative">
            <button
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${
                  item.badgeColor || 'bg-blue-100 text-blue-600'
                }`}>
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight className="w-4 h-4 ml-2 text-blue-600" />}
            </button>
            {/* 悬停提示 */}
            <div className="absolute left-full ml-2 hidden group-hover:block">
              <div className="bg-gray-900 text-white text-sm rounded-lg py-1 px-3 w-48">
                {item.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      {/* 系统标题 */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
        <h1 className="text-lg font-semibold text-white">保洁管理系统</h1>
      </div>

      {/* 菜单内容 */}
      <nav className="p-4 space-y-8">
        {renderMenuGroup(menuGroups.main, '基础功能')}
        {renderMenuGroup(menuGroups.management, '业务管理')}
        {renderMenuGroup(menuGroups.system, '系统功能')}
      </nav>

      {/* 底部信息 */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-gray-50">
        <div className="p-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span className="flex items-center">
              <Info className="w-3 h-3 mr-1" />
              版本 1.0.0
            </span>
            <a href="#" className="flex items-center hover:text-blue-600 transition-colors">
              <HelpCircle className="w-3 h-3 mr-1" />
              系统帮助
            </a>
          </div>
          <div className="text-xs text-gray-400">
            © 2024 保洁管理系统
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;