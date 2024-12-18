import React from 'react';
import StockValueChart from '../components/inventory/statistics/StockValueChart';
import StockLevelDistribution from '../components/inventory/statistics/StockLevelDistribution';
import StockTurnoverChart from '../components/inventory/statistics/StockTurnoverChart';
import TopItemsTable from '../components/inventory/statistics/TopItemsTable';
import useInventoryStatistics from '../hooks/inventory/useInventoryStatistics';
import useInventoryItems from '../hooks/inventory/useInventoryItems';

const InventoryStatisticsPage: React.FC = () => {
  const { items } = useInventoryItems();
  const statistics = useInventoryStatistics(items);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">库存统计分析</h1>
        <p className="mt-1 text-sm text-gray-500">
          查看库存价值分布、库存水平和周转率等关键指标。
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <StockValueChart
          totalValue={statistics.totalValue}
          valueByCategory={statistics.valueByCategory}
        />
        <StockLevelDistribution {...statistics.stockLevels} />
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">库存价值TOP10</h2>
          <TopItemsTable items={statistics.topItems} type="value" />
        </div>
        <StockTurnoverChart
          turnoverRate={statistics.turnoverRate}
          monthlyData={statistics.monthlyTurnover}
        />
      </div>
    </div>
  );
};

export default InventoryStatisticsPage;