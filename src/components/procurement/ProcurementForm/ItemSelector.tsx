import React from 'react';
import { Item } from '../../../types';
import { Search } from 'lucide-react';

interface ItemSelectorProps {
  items: Item[];
  onSelect: (item: Item) => void;
  className?: string;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({ items, onSelect, className = '' }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="block w-full rounded-md border-gray-300 shadow-sm 
            focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-10"
          placeholder="搜索物品..."
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      </div>

      {isOpen && filteredItems.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              onClick={() => {
                onSelect(item);
                setIsOpen(false);
                setSearchQuery('');
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.code}</div>
                </div>
                <div className="text-sm text-gray-500">
                  库存: {item.currentStock} {item.unit}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ItemSelector;