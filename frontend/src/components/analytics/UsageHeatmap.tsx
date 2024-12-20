import React from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

interface UsageHeatmapProps {
  data: number[][];
  xLabels: string[];
  yLabels: string[];
}

const UsageHeatmap: React.FC<UsageHeatmapProps> = ({ data, xLabels, yLabels }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">物品使用频率热力图</h3>
      <div className="w-full h-[400px]">
        <HeatMapGrid
          data={data}
          xLabels={xLabels}
          yLabels={yLabels}
          cellRender={(_, __, value) => (
            <div title={`${value} 次使用`} className="w-full h-full">
              {value > 0 && <span className="text-xs text-gray-700">{value}</span>}
            </div>
          )}
          cellStyle={(_, __, ratio) => ({
            background: `rgb(59, 130, 246, ${ratio})`,
            fontSize: '11px',
            color: ratio > 0.5 ? '#fff' : '#1f2937'
          })}
          xLabelsStyle={() => ({
            fontSize: '12px',
            color: '#4b5563'
          })}
          yLabelsStyle={() => ({
            fontSize: '12px',
            color: '#4b5563',
            textAlign: 'right',
            paddingRight: '10px'
          })}
          square
        />
      </div>
      <div className="mt-4 flex items-center justify-end space-x-2 text-sm text-gray-500">
        <div className="w-3 h-3 bg-blue-100"></div>
        <span>低频率</span>
        <div className="w-3 h-3 bg-blue-300 ml-2"></div>
        <span>中频率</span>
        <div className="w-3 h-3 bg-blue-500 ml-2"></div>
        <span>高频率</span>
      </div>
    </div>
  );
};

export default UsageHeatmap; 