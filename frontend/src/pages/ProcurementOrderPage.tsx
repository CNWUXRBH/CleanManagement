import React, { useState } from 'react';
import Card from '../components/shared/Card';
import OrderHeader from '../components/procurement/OrderDetails/OrderHeader';
import OrderActions from '../components/procurement/OrderDetails/OrderActions';
import OrderTimeline from '../components/procurement/OrderDetails/OrderTimeline';
import CommentList from '../components/procurement/OrderDetails/CommentList';
import CommentForm from '../components/procurement/OrderDetails/CommentForm';
import NotificationList from '../components/procurement/OrderDetails/NotificationList';
import useOrderComments from '../hooks/procurement/useOrderComments';
import useOrderNotifications from '../hooks/procurement/useOrderNotifications';
import useOrderActions from '../hooks/procurement/useOrderActions';

// Mock data for demonstration
const mockOrder = {
  id: '1',
  orderNumber: 'PO2024030001',
  requestDate: '2024-03-01',
  department: '清洁部',
  totalAmount: 2580.50,
  status: 'pending',
  items: [
    { id: '1', name: '洗手液', quantity: 100, price: 12.5 },
    { id: '2', name: '抹布', quantity: 200, price: 3.5 },
  ]
};

const mockEvents = [
  {
    id: '1',
    type: 'created',
    description: '采购申请已创建',
    timestamp: '2024-03-01 09:00:00',
    userId: 'USER001'
  },
  {
    id: '2',
    type: 'commented',
    description: '添加了备注',
    timestamp: '2024-03-01 10:30:00',
    userId: 'USER002',
    note: '请尽快处理此采购申请'
  }
];

const ProcurementOrderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'comments' | 'notifications'>('timeline');
  const { comments, isSubmitting, addComment } = useOrderComments(mockOrder.id);
  const { notifications, markAsRead } = useOrderNotifications(mockOrder.id);
  const { isLoading, approveOrder, rejectOrder, exportOrder } = useOrderActions();

  const handleApprove = async () => {
    if (await approveOrder(mockOrder.id)) {
      // Handle success
      console.log('Order approved');
    }
  };

  const handleReject = async () => {
    if (await rejectOrder(mockOrder.id)) {
      // Handle success
      console.log('Order rejected');
    }
  };

  const handleExport = async () => {
    if (await exportOrder(mockOrder.id)) {
      // Handle success
      console.log('Order exported');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <Card>
            <OrderHeader order={mockOrder} />
          </Card>

          <Card>
            <div className="mb-6">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={\`px-3 py-2 text-sm font-medium rounded-md \${
                    activeTab === 'timeline'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }\`}
                >
                  处理进度
                </button>
                <button
                  onClick={() => setActiveTab('comments')}
                  className={\`px-3 py-2 text-sm font-medium rounded-md \${
                    activeTab === 'comments'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }\`}
                >
                  备注
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={\`px-3 py-2 text-sm font-medium rounded-md \${
                    activeTab === 'notifications'
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }\`}
                >
                  通知
                </button>
              </nav>
            </div>

            {activeTab === 'timeline' && <OrderTimeline events={mockEvents} />}
            {activeTab === 'comments' && (
              <div className="space-y-6">
                <CommentList comments={comments} />
                <CommentForm onSubmit={addComment} isSubmitting={isSubmitting} />
              </div>
            )}
            {activeTab === 'notifications' && (
              <NotificationList
                notifications={notifications}
                onMarkAsRead={markAsRead}
              />
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <OrderActions
              order={mockOrder}
              onApprove={handleApprove}
              onReject={handleReject}
              onExport={handleExport}
              onPrint={handlePrint}
              onComment={() => setActiveTab('comments')}
              isProcessing={isLoading}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProcurementOrderPage;