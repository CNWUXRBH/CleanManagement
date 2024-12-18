import React, { useState } from 'react';
import { Supplier } from '../types';
import SupplierInfo from '../components/supplier/details/SupplierInfo';
import SupplierHistory from '../components/supplier/details/SupplierHistory';
import SupplierActions from '../components/supplier/details/SupplierActions';
import Card from '../components/shared/Card';

// Mock data
const mockSupplier: Supplier = {
  id: 'SUP001',
  name: '清洁之星供应链',
  contact: '张经理',
  phone: '13800138000',
  email: 'contact@cleanstar.com',
  address: '上海市浦东新区张江高科技园区',
};

const SupplierDetailsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'history'>('info');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">供应商详情</h1>
        <p className="mt-1 text-sm text-gray-500">
          查看和管理供应商详细信息、合作记录。
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <div className="mb-6">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'info'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  基本信息
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === 'history'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  合作记录
                </button>
              </nav>
            </div>

            {activeTab === 'info' ? (
              <SupplierInfo supplier={mockSupplier} />
            ) : (
              <SupplierHistory supplierId={mockSupplier.id} />
            )}
          </Card>
        </div>

        <div className="col-span-1">
          <SupplierActions supplier={mockSupplier} />
        </div>
      </div>
    </div>
  );
};

export default SupplierDetailsPage;