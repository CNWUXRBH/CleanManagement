import React from 'react';
import { Package, AlertTriangle, Ban, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, trend, trendUp }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center">
      <div className="flex-shrink-0">
        <div className="p-3 bg-indigo-50 rounded-full">{icon}</div>
      </div>
      <div className="ml-5 w-0 flex-1">
        <dl>
          <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
          <dd className="flex items-baseline">
            <div className="text-2xl font-semibold text-gray-900">{value}</div>
            {trend && (
              <div className={`ml-2 flex items-baseline text-sm font-semibold
                ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {trend}
              </div>
            )}
          </dd>
        </dl>
      </div>
    </div>
  </div>
);

interface InventoryStatsProps {
  totalItems: number;
  lowStockItems: number;
  outOfStockItems: number;
  monthlyConsumption: number;
}

const InventoryStats: React.FC<InventoryStatsProps> = ({
  totalItems,
  lowStockItems,
  outOfStockItems,
  monthlyConsumption,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
      <StatsCard
        title="总库存物品"
        value={totalItems}
        icon={<Package className="h-6 w-6 text-indigo-600" />}
      />
      <StatsCard
        title="库存不足"
        value={lowStockItems}
        icon={<AlertTriangle className="h-6 w-6 text-amber-600" />}
        trend={`较上月${lowStockItems > 5 ? '增加' : '减少'}`}
        trendUp={lowStockItems > 5}
      />
      <StatsCard
        title="库存耗尽"
        value={outOfStockItems}
        icon={<Ban className="h-6 w-6 text-red-600" />}
      />
      <StatsCard
        title="月度消耗量"
        value={monthlyConsumption}
        icon={<TrendingUp className="h-6 w-6 text-green-600" />}
        trend="较上月增长 12%"
        trendUp={true}
      />
    </div>
  );
};

export default InventoryStats;