import React from 'react';
import { Bell, User } from 'lucide-react';

interface HeaderProps {
  onNotificationClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNotificationClick }) => {
  return (
    <header className="bg-white border-b border-gray-200 h-16">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-gray-800">库存管理</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 hover:bg-gray-100 rounded-full relative"
            onClick={onNotificationClick}
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">管理员</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;