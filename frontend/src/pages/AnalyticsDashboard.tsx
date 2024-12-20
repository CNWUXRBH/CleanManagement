import React from 'react';
import InventoryTrendChart from '../components/analytics/InventoryTrendChart';
import UsageHeatmap from '../components/analytics/UsageHeatmap';
import WarehouseView3D from '../components/analytics/WarehouseView3D';
import DepartmentComparison from '../components/analytics/DepartmentComparison';
import SmartAlert from '../components/notifications/SmartAlert';
import ProcurementSuggestion from '../components/notifications/ProcurementSuggestion';
import MaintenanceReminder from '../components/notifications/MaintenanceReminder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/shared/Tabs';

const AnalyticsDashboard: React.FC = () => {
  // 模拟数据
  const inventoryTrendData = {
    labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
    actual: [100, 120, 115, 130, 140, 135],
    predicted: [135, 145, 150, 155, 160, 165],
  };

  const usageHeatmapData = {
    data: [
      [4, 2, 6, 8, 5, 3],
      [2, 5, 3, 7, 4, 6],
      [6, 3, 5, 2, 8, 4],
      [3, 7, 4, 6, 2, 5],
    ],
    xLabels: ['周一', '周二', '周三', '周四', '周五', '周六'],
    yLabels: ['清洁剂', '拖把', '抹布', '洗手液'],
  };

  const warehouseLayoutData = {
    shelves: [
      { position: [0, 0, 0] as [number, number, number], size: [2, 3, 1] as [number, number, number], utilization: 0.8 },
      { position: [3, 0, 0] as [number, number, number], size: [2, 3, 1] as [number, number, number], utilization: 0.5 },
      { position: [6, 0, 0] as [number, number, number], size: [2, 3, 1] as [number, number, number], utilization: 0.3 },
      { position: [0, 0, 3] as [number, number, number], size: [2, 3, 1] as [number, number, number], utilization: 0.9 },
      { position: [3, 0, 3] as [number, number, number], size: [2, 3, 1] as [number, number, number], utilization: 0.6 },
      { position: [6, 0, 3] as [number, number, number], size: [2, 3, 1] as [number, number, number], utilization: 0.4 },
    ],
  };

  const departmentComparisonData = {
    departments: ['行政部', '销售部', '技术部', '人事部'],
    consumption: [
      {
        category: '清洁用品',
        values: [30, 25, 35, 20],
      },
      {
        category: '办公用品',
        values: [20, 30, 25, 15],
      },
      {
        category: '消毒用品',
        values: [15, 20, 25, 30],
      },
    ],
  };

  const alerts = [
    {
      id: '1',
      type: 'stock' as const,
      title: '库存预警',
      description: '5种清洁用品库存低于安全库存水平',
      priority: 'high' as const,
      timestamp: '10分钟前',
      action: {
        label: '查看详情',
        onClick: () => console.log('查看库存预警'),
      },
    },
    {
      id: '2',
      type: 'expiry' as const,
      title: '保质期提醒',
      description: '3种消毒液将在30天内过期',
      priority: 'medium' as const,
      timestamp: '1小时前',
      action: {
        label: '处理',
        onClick: () => console.log('处理过期物品'),
      },
    },
  ];

  const procurementSuggestions = [
    {
      id: '1',
      name: '84消毒液',
      currentStock: 50,
      suggestedAmount: 100,
      reason: '基于历史数据分析，预计下月使用量将增加50%',
      trend: 'up' as const,
      historicalData: [
        { month: '1月', consumption: 80 },
        { month: '2月', consumption: 85 },
        { month: '3月', consumption: 90 },
        { month: '4月', consumption: 95 },
        { month: '5月', consumption: 100 },
      ],
      priority: 'high' as const,
    },
    {
      id: '2',
      name: '抹布',
      currentStock: 200,
      suggestedAmount: 150,
      reason: '当前库存充足，建议适量采购',
      trend: 'down' as const,
      historicalData: [
        { month: '1月', consumption: 180 },
        { month: '2月', consumption: 170 },
        { month: '3月', consumption: 160 },
        { month: '4月', consumption: 150 },
        { month: '5月', consumption: 140 },
      ],
      priority: 'low' as const,
    },
  ];

  const maintenanceTasks = [
    {
      id: '1',
      title: '清洁设备年度保养',
      description: '对所有清洁设备进行全面检查和保养',
      dueDate: '2024-03-15',
      status: 'pending' as const,
      priority: 'high' as const,
      assignee: {
        name: '张工',
        avatar: 'https://via.placeholder.com/40',
      },
      checklist: [
        { id: '1', task: '检查设备运行状态', completed: true },
        { id: '2', task: '更换过滤器', completed: false },
        { id: '3', task: '清理储水箱', completed: false },
        { id: '4', task: '测试性能', completed: false },
      ],
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">数据分析与智能提醒</h2>
        <p className="mt-1 text-gray-500">
          实时监控系统运行状态，智能预测库存趋势，提供决策支持
        </p>
      </div>

      <Tabs defaultValue="analytics">
        <TabsList>
          <TabsTrigger value="analytics">数据分析</TabsTrigger>
          <TabsTrigger value="alerts">智能提醒</TabsTrigger>
          <TabsTrigger value="suggestions">采购建议</TabsTrigger>
          <TabsTrigger value="maintenance">维护计划</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InventoryTrendChart data={inventoryTrendData} />
            <UsageHeatmap {...usageHeatmapData} />
            <div className="lg:col-span-2">
              <WarehouseView3D layout={warehouseLayoutData} />
            </div>
            <div className="lg:col-span-2">
              <DepartmentComparison data={departmentComparisonData} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <div className="max-w-3xl">
            <SmartAlert
              alerts={alerts}
              onDismiss={(id) => console.log('关闭提醒:', id)}
            />
          </div>
        </TabsContent>

        <TabsContent value="suggestions">
          <div className="max-w-3xl">
            <ProcurementSuggestion
              suggestions={procurementSuggestions}
              onAccept={(id) => console.log('接受建议:', id)}
              onReject={(id) => console.log('拒绝建议:', id)}
            />
          </div>
        </TabsContent>

        <TabsContent value="maintenance">
          <div className="max-w-3xl">
            <MaintenanceReminder
              tasks={maintenanceTasks}
              onComplete={(id) => console.log('完成任务:', id)}
              onChecklistItemToggle={(taskId, itemId) =>
                console.log('切换检查项:', taskId, itemId)
              }
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard; 