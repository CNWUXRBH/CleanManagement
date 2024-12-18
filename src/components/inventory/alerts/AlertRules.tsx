import React from 'react';
import Card from '../../shared/Card';
import { AlertTriangle, Calendar, TrendingUp } from 'lucide-react';

interface AlertRule {
  id: string;
  type: 'low_stock' | 'expiring' | 'consumption';
  name: string;
  condition: string;
  isActive: boolean;
}

interface AlertRulesProps {
  rules: AlertRule[];
  onToggleRule: (id: string) => void;
  onEditRule: (id: string) => void;
}

const AlertRules: React.FC<AlertRulesProps> = ({
  rules,
  onToggleRule,
  onEditRule
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'low_stock':
        return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'expiring':
        return <Calendar className="w-5 h-5 text-red-500" />;
      case 'consumption':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <Card title="预警规则">
      <div className="space-y-4">
        {rules.map(rule => (
          <div
            key={rule.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {getIcon(rule.type)}
              <div>
                <h4 className="text-sm font-medium text-gray-900">{rule.name}</h4>
                <p className="text-sm text-gray-500">{rule.condition}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rule.isActive}
                  onChange={() => onToggleRule(rule.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 
                    border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-900">
                  {rule.isActive ? '启用' : '禁用'}
                </span>
              </label>
              
              <button
                onClick={() => onEditRule(rule.id)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                编辑
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AlertRules;