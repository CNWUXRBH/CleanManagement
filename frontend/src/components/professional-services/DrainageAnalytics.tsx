import React, { useMemo } from 'react';
import { DrainageService } from '../../types/services';
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface DrainageAnalyticsProps {
  services: DrainageService[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DrainageAnalytics: React.FC<DrainageAnalyticsProps> = ({ services }) => {
  // 计算服务频率统计（最近6个月）
  const serviceFrequencyData = useMemo(() => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = subMonths(new Date(), i);
      return {
        month: format(date, 'yyyy-MM'),
        start: startOfMonth(date),
        end: endOfMonth(date),
      };
    }).reverse();

    return last6Months.map(({ month, start, end }) => ({
      month,
      count: services.filter(service => 
        isWithinInterval(new Date(service.requestDate), { start, end })
      ).length,
    }));
  }, [services]);

  // 计算服务类型分布
  const serviceTypeDistribution = useMemo(() => {
    const distribution = services.reduce((acc, service) => {
      acc[service.drainageType] = (acc[service.drainageType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(distribution).map(([type, value]) => ({
      name: type === 'rainwater' ? '雨水管'
        : type === 'sewage' ? '污水管'
        : '雨污合流管',
      value,
    }));
  }, [services]);

  // 计算平均处理时间（小时）
  const averageProcessingTime = useMemo(() => {
    const completedServices = services.filter(
      service => service.status === 'completed' && service.completionDate
    );

    if (completedServices.length === 0) return 0;

    const totalHours = completedServices.reduce((total, service) => {
      const start = new Date(service.requestDate);
      const end = new Date(service.completionDate!);
      return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    }, 0);

    return Math.round(totalHours / completedServices.length);
  }, [services]);

  // 计算平均费用
  const averageCost = useMemo(() => {
    const completedServices = services.filter(
      service => service.status === 'completed' && service.actualCost !== undefined
    );

    if (completedServices.length === 0) return 0;

    const totalCost = completedServices.reduce(
      (total, service) => total + (service.actualCost || 0),
      0
    );

    return totalCost / completedServices.length;
  }, [services]);

  // 计算设备使用频率
  const equipmentUsageData = useMemo(() => {
    const usage = services.reduce((acc, service) => {
      if (service.equipmentUsed) {
        service.equipmentUsed.forEach(equipment => {
          acc[equipment] = (acc[equipment] || 0) + 1;
        });
      }
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(usage)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [services]);

  return (
    <div className="space-y-8">
      {/* 概览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">平均处理时间</h3>
          <p className="text-3xl font-bold text-blue-600">{averageProcessingTime}小时</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">平均费用</h3>
          <p className="text-3xl font-bold text-green-600">¥{averageCost.toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-2">完成率</h3>
          <p className="text-3xl font-bold text-orange-600">
            {Math.round((services.filter(s => s.status === 'completed').length / services.length) * 100)}%
          </p>
        </div>
      </div>

      {/* 服务频率图表 */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">服务频率趋势</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={serviceFrequencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="服务数量" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 服务类型分布 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">服务类型分布</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceTypeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {serviceTypeDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 设备使用频率 */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">设备使用频率</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={equipmentUsageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="使用次数" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrainageAnalytics; 