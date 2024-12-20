import React from 'react';
import DrainageServiceList from '../components/professional-services/DrainageServiceList';
import DrainageServiceForm from '../components/professional-services/DrainageServiceForm';
import DrainageAnalytics from '../components/professional-services/DrainageAnalytics';
import DrainageAutomation from '../components/professional-services/DrainageAutomation';
import DrainageReports from '../components/professional-services/DrainageReports';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/shared/Tabs';
import { Droplets, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { useDrainageServices } from '../hooks/useDrainageServices';

const ProfessionalServicesPage: React.FC = () => {
  const {
    services,
    teams,
    handleSubmit,
    handleAssignTeam,
    handleScheduleService,
    handleServiceComplete,
  } = useDrainageServices();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">雨污水管疏通服务管理</h1>
          <p className="mt-2 text-gray-600">管理雨水管和污水管的疏通、维护和检修服务</p>
        </div>
        <div className="text-sm text-gray-500">
          最后更新：{new Date().toLocaleString('zh-CN')}
        </div>
      </div>

      {/* 概览统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <Droplets className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">本月服务长度</p>
              <p className="text-2xl font-semibold text-gray-900">2,500m</p>
              <p className="text-sm text-green-600">↑ 15% 较上月</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">本月服务次数</p>
              <p className="text-2xl font-semibold text-gray-900">32次</p>
              <p className="text-sm text-green-600">↑ 10% 较上月</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">完成率</p>
              <p className="text-2xl font-semibold text-gray-900">95%</p>
              <p className="text-sm text-green-600">↑ 3% 较上月</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-yellow-100">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">服务金额</p>
              <p className="text-2xl font-semibold text-gray-900">¥68,500</p>
              <p className="text-sm text-green-600">↑ 8% 较上月</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <Tabs defaultValue="list" className="p-6">
          <TabsList>
            <TabsTrigger value="list">服务记录</TabsTrigger>
            <TabsTrigger value="new">新增服务</TabsTrigger>
            <TabsTrigger value="analytics">数据分析</TabsTrigger>
            <TabsTrigger value="automation">自动调度</TabsTrigger>
            <TabsTrigger value="reports">报表管理</TabsTrigger>
          </TabsList>

          <TabsContent value="list">
            <DrainageServiceList 
              services={services}
              onServiceClick={service => {
                if (service.status === 'in_progress') {
                  // 提示输入实际费用并完成服务
                  const actualCost = window.prompt('请输入实际费用：', service.estimatedCost.toString());
                  if (actualCost !== null) {
                    handleServiceComplete(service.id, parseFloat(actualCost));
                  }
                }
              }}
            />
          </TabsContent>

          <TabsContent value="new">
            <DrainageServiceForm onSubmit={handleSubmit} />
          </TabsContent>

          <TabsContent value="analytics">
            <DrainageAnalytics services={services} />
          </TabsContent>

          <TabsContent value="automation">
            <DrainageAutomation
              services={services}
              teams={teams}
              onAssignTeam={handleAssignTeam}
              onScheduleService={handleScheduleService}
            />
          </TabsContent>

          <TabsContent value="reports">
            <DrainageReports services={services} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfessionalServicesPage; 