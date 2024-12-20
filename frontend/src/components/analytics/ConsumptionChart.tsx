import React from 'react';
import Card from '../shared/Card';

const ConsumptionChart: React.FC = () => {
  return (
    <Card title="消耗趋势">
      <div className="h-80 flex items-center justify-center text-gray-500">
        图表组件待实现 - 需要集成图表库（如 ECharts 或 Chart.js）
      </div>
    </Card>
  );
};

export default ConsumptionChart;