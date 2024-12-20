import React from 'react';
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
  Cell
} from 'recharts';

interface LabelProps {
  name: string;
  percent: number;
}

const ServiceAnalytics: React.FC = () => {
  // TODO: Implement API integration to fetch analytics data
  const monthlyData = [
    { month: '1月', area: 1200, amount: 6000 },
    { month: '2月', area: 1500, amount: 7500 },
    { month: '3月', area: 1800, amount: 9000 },
    // Add more monthly data...
  ];

  const departmentData = [
    { name: '行政部', value: 3500 },
    { name: '研发部', value: 2800 },
    { name: '销售部', value: 2000 },
    // Add more department data...
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderCustomizedLabel = ({ name, percent }: LabelProps) => {
    return `${name} ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="space-y-8">
      {/* Monthly Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">月度服务统计</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="area" name="面积 (㎡)" fill="#8884d8" />
              <Bar yAxisId="right" dataKey="amount" name="金额 (元)" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Department Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">部门分布</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-sm font-medium text-gray-500">本月总服务面积</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">4,500㎡</p>
          <p className="mt-2 text-sm text-green-600">↑ 12% 较上月</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-sm font-medium text-gray-500">本月服务金额</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">¥22,500</p>
          <p className="mt-2 text-sm text-green-600">↑ 8% 较上月</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h4 className="text-sm font-medium text-gray-500">本月服务次数</h4>
          <p className="mt-2 text-3xl font-semibold text-gray-900">15</p>
          <p className="mt-2 text-sm text-red-600">↓ 5% 较上月</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceAnalytics; 