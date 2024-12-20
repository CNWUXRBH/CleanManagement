import React, { useState } from 'react';
import { format } from 'date-fns';
import { ChevronRight, FileText, Search, Filter } from 'lucide-react';
import EmptyState from '../shared/EmptyState';
import Button from '../shared/Button';

interface ServiceRecord {
  id: string;
  date: string;
  area: string;
  areaSize: number;
  amount: number;
  department: string;
  verifier: string;
  supplies: Array<{
    name: string;
    quantity: number;
    unit: string;
  }>;
  notes?: string;
  status: 'pending' | 'completed' | 'cancelled';
}

const ServicesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // TODO: Implement API integration to fetch service records
  const records: ServiceRecord[] = [
    {
      id: '1',
      date: '2024-03-15',
      area: '办公区A区',
      areaSize: 500,
      amount: 2500,
      department: '行政部',
      verifier: '张三',
      supplies: [
        { name: '清洁剂', quantity: 2, unit: '瓶' },
        { name: '抹布', quantity: 5, unit: '块' }
      ],
      status: 'completed',
      notes: '月度例行清洁'
    },
    {
      id: '2',
      date: '2024-03-16',
      area: '会议室B区',
      areaSize: 300,
      amount: 1500,
      department: '研发部',
      verifier: '李四',
      supplies: [
        { name: '地板蜡', quantity: 1, unit: '桶' }
      ],
      status: 'pending',
      notes: '特殊要：使用环保清洁剂'
    }
  ];

  const handleAddNew = () => {
    const newRecordTab = document.querySelector('[value="new"]') as HTMLElement;
    if (newRecordTab) {
      newRecordTab.click();
    }
  };

  const getStatusBadge = (status: ServiceRecord['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };

    const labels = {
      pending: '待验收',
      completed: '已完成',
      cancelled: '已取消'
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  if (records.length === 0) {
    return (
      <EmptyState
        title="暂无服务记录"
        description={'点击"新增记录"添加专业保洁服务记录'}
        actionText="新增记录"
        onAction={handleAddNew}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="搜索服务记录..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={<Filter className="w-4 h-4" />}
          >
            筛选
          </Button>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleAddNew}
        >
          新增记录
        </Button>
      </div>

      <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
        {records.map((record) => (
          <div key={record.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-gray-400" />
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{record.area}</h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span>{format(new Date(record.date), 'yyyy-MM-dd')}</span>
                    <span>•</span>
                    <span>{record.department}</span>
                    <span>•</span>
                    <span>{record.areaSize}㎡</span>
                    <span>•</span>
                    <span>¥{record.amount}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {getStatusBadge(record.status)}
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">验收人：{record.verifier}</div>
                  <div className="text-sm text-gray-500">
                    使用物品：{record.supplies.map(s => `${s.name}${s.quantity}${s.unit}`).join('、')}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            {record.notes && (
              <div className="mt-2 text-sm text-gray-500">
                备注：{record.notes}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesList; 