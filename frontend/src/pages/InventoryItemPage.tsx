import React, { useState } from 'react';
import { Item } from '../types';
import ItemDetails from '../components/inventory/item/ItemDetails';
import MovementHistory from '../components/inventory/item/MovementHistory';
import ItemActions from '../components/inventory/item/ItemActions';
import Card from '../components/shared/Card';

// Mock data for demonstration
const mockItem: Item = {
  id: '1',
  code: 'CL001',
  name: '洗手液',
  category: 'chemical',
  specification: '500ml/瓶',
  unit: '瓶',
  minStock: 100,
  currentStock: 85,
  supplierId: 'SUP001',
  price: 12.5
};

const InventoryItemPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'details' | 'movements'>('details');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">物品详情</h1>
        <p className="mt-1 text-sm text-gray-500">
          查看和管理物品详细信息、库存变动记录。
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <div className="mb-6">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'details'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  基本信息
                </button>
                <button
                  onClick={() => setActiveTab('movements')}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'movements'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  出入库记录
                </button>
              </nav>
            </div>

            {activeTab === 'details' ? (
              <ItemDetails item={mockItem} />
            ) : (
              <MovementHistory itemId={mockItem.id} />
            )}
          </Card>
        </div>

        <div className="col-span-1">
          <ItemActions item={mockItem} />
        </div>
      </div>
    </div>
  );
}

export default InventoryItemPage;