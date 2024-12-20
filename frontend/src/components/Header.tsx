import React, { useState } from 'react';
import { Bell, Search, Settings, HelpCircle, ChevronDown, LogOut, UserCircle, LayoutGrid } from 'lucide-react';

interface HeaderProps {
  onNotificationClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNotificationClick }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* 搜索框 */}
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500" />
              </div>
              <input
                type="text"
                placeholder="搜索物品、记录、文档..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 sm:text-sm transition-all duration-200"
              />
              <kbd className="absolute right-3 top-2.5 px-2 py-0.5 text-xs text-gray-400 bg-gray-100 rounded hidden sm:inline-block">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* 右侧工具栏 */}
          <div className="flex items-center space-x-2 ml-8">
            {/* 快速导航 */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <LayoutGrid className="h-5 w-5" />
            </button>

            {/* 帮助按钮 */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <HelpCircle className="h-5 w-5" />
            </button>

            {/* 通知按钮 */}
            <button
              onClick={onNotificationClick}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
            </button>

            {/* 设置按钮 */}
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Settings className="h-5 w-5" />
            </button>

            {/* 分隔线 */}
            <div className="h-6 w-px bg-gray-200 mx-2" />

            {/* 用户菜单 */}
            <div className="relative">
              <button
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium shadow-sm">
                    A
                  </div>
                </div>
                <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-700">管理员</span>
                  <span className="text-xs text-gray-500">admin@example.com</span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* 用户下拉菜单 */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50 transform opacity-100 scale-100 transition-all duration-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">管理员</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">admin@example.com</p>
                  </div>
                  <div className="py-1">
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                      <UserCircle className="h-4 w-4 mr-3 text-gray-400" />
                      个人信息
                    </a>
                    <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150">
                      <LogOut className="h-4 w-4 mr-3 text-red-500" />
                      退出登录
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;