import React from 'react';
import Card from '../shared/Card';

const ConsumptionChart: React.FC = () => {
  return (
    <Card title="物资消耗趋势">
      <div className="h-80">
        {/* Chart will be implemented using a charting library */}
        <div className="flex items-center justify-center h-full text-gray-500">
          物资消耗趋势图表
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <div>总消耗量: 12,580件</div>
        <div>平均日消耗: 420件</div>
      </div>
    </Card>
  );
};

export default ConsumptionChart;