import React from 'react';
import { Item } from '../../types';
import ItemCard from './ItemCard';
import LoadingSpinner from '../shared/LoadingSpinner';
import ErrorMessage from '../shared/ErrorMessage';

interface InventoryListProps {
  items: Item[];
  isLoading: boolean;
  error?: string;
  onEdit?: (item: Item) => void;
  onDelete?: (id: string) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({
  items,
  isLoading,
  error,
  onEdit,
  onDelete
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">暂无库存数据</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <ItemCard 
          key={item.id} 
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default InventoryList;