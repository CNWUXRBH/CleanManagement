import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DepartmentComparisonProps {
  data: {
    departments: string[];
    consumption: {
      category: string;
      values: number[];
    }[];
  };
}

const DepartmentComparison: React.FC<DepartmentComparisonProps> = ({ data }) => {
  const colors = [
    'rgba(59, 130, 246, 0.8)',
    'rgba(16, 185, 129, 0.8)',
    'rgba(249, 115, 22, 0.8)',
    'rgba(139, 92, 246, 0.8)',
  ];

  const chartData = {
    labels: data.departments,
    datasets: data.consumption.map((item, index) => ({
      label: item.category,
      data: item.values,
      backgroundColor: colors[index % colors.length],
      borderColor: colors[index % colors.length].replace('0.8', '1'),
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '部门物品消耗对比',
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: '部门',
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: '消耗数量',
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">部门消耗对比分析</h3>
        <div className="flex items-center space-x-4">
          <select className="text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option>本月</option>
            <option>上月</option>
            <option>近三月</option>
            <option>近半年</option>
          </select>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            导出报告
          </button>
        </div>
      </div>
      <Bar data={chartData} options={options} />
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.consumption.map((item, index) => (
          <div key={item.category} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-sm text-gray-600">{item.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentComparison; 