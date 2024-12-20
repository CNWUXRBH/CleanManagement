import React from 'react';
import AnalyticsHeader from '../components/analytics/AnalyticsHeader';
import AnalyticsSummary from '../components/analytics/AnalyticsSummary';
import ConsumptionChart from '../components/analytics/ConsumptionChart';
import CategoryDistribution from '../components/analytics/CategoryDistribution';
import DepartmentUsage from '../components/analytics/DepartmentUsage';
import StockTrends from '../components/analytics/StockTrends';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="p-6">
      <AnalyticsHeader />
      
      <div className="mb-6">
        <AnalyticsSummary />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ConsumptionChart />
        <CategoryDistribution />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentUsage />
        <StockTrends />
      </div>
    </div>
  );
};

export default AnalyticsPage;