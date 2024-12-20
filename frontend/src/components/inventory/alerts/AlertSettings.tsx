import React from 'react';
import Card from '../../shared/Card';
import Button from '../../shared/Button';
import { Save } from 'lucide-react';

interface AlertSettingsProps {
  settings: {
    lowStockThreshold: number;
    expiryWarningDays: number;
    consumptionAlertPercentage: number;
  };
  onSave: (settings: any) => void;
}

const AlertSettings: React.FC<AlertSettingsProps> = ({ settings, onSave }) => {
  const [formData, setFormData] = React.useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card title="预警设置">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              库存不足预警阈值 (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.lowStockThreshold}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                lowStockThreshold: parseInt(e.target.value)
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              过期预警天数
            </label>
            <input
              type="number"
              min="1"
              value={formData.expiryWarningDays}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                expiryWarningDays: parseInt(e.target.value)
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              异常消耗预警比例 (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.consumptionAlertPercentage}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                consumptionAlertPercentage: parseInt(e.target.value)
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            icon={<Save className="w-4 h-4" />}
          >
            保存设置
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AlertSettings;