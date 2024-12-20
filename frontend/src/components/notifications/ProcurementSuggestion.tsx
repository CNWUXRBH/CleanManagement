import React from 'react';
import { TrendingUp, TrendingDown, History, Package, ChevronRight } from 'lucide-react';

interface SuggestionItem {
  id: string;
  name: string;
  currentStock: number;
  suggestedAmount: number;
  reason: string;
  trend: 'up' | 'down' | 'stable';
  historicalData: {
    month: string;
    consumption: number;
  }[];
  priority: 'high' | 'medium' | 'low';
}

interface ProcurementSuggestionProps {
  suggestions: SuggestionItem[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

const ProcurementSuggestion: React.FC<ProcurementSuggestionProps> = ({
  suggestions,
  onAccept,
  onReject,
}) => {
  const getTrendIcon = (trend: SuggestionItem['trend']) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <History className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityStyles = (priority: SuggestionItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-4">
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.id}
          className={`border rounded-lg p-4 ${getPriorityStyles(
            suggestion.priority
          )} transition-all duration-200 hover:shadow-sm`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Package className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">{suggestion.name}</h4>
                <div className="mt-1 flex items-center space-x-2 text-sm text-gray-600">
                  <span>当前库存: {suggestion.currentStock}</span>
                  <span>•</span>
                  <span>建议采购: {suggestion.suggestedAmount}</span>
                  {getTrendIcon(suggestion.trend)}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onReject(suggestion.id)}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                忽略
              </button>
              <button
                onClick={() => onAccept(suggestion.id)}
                className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                采纳
              </button>
            </div>
          </div>

          <p className="mt-2 text-sm text-gray-600">{suggestion.reason}</p>

          {/* 历史数据图表 */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h5 className="text-xs font-medium text-gray-500">近期消耗趋势</h5>
              <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center">
                查看详情
                <ChevronRight className="w-3 h-3 ml-1" />
              </button>
            </div>
            <div className="h-12 flex items-end space-x-1">
              {suggestion.historicalData.map((data) => {
                const height = (data.consumption / Math.max(...suggestion.historicalData.map(d => d.consumption))) * 100;
                return (
                  <div key={data.month} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-blue-200 rounded-sm transition-all duration-300 hover:bg-blue-300"
                      style={{ height: `${height}%` }}
                      title={`${data.month}: ${data.consumption}`}
                    />
                    <span className="mt-1 text-xs text-gray-400">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProcurementSuggestion; 