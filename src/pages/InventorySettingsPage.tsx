import React from 'react';
import AlertSettings from '../components/inventory/alerts/AlertSettings';
import useAlertSettings from '../hooks/inventory/useAlertSettings';
import Card from '../components/shared/Card';

const InventorySettingsPage: React.FC = () => {
  const { settings, updateSettings } = useAlertSettings();

  const handleSaveSettings = async (newSettings: any) => {
    const success = await updateSettings(newSettings);
    if (success) {
      // Show success message
      console.log('Settings saved successfully');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">库存设置</h1>
        <p className="mt-1 text-sm text-gray-500">
          配置库存预警规则和系统参数。
        </p>
      </div>

      <div className="space-y-6">
        <AlertSettings
          settings={settings}
          onSave={handleSaveSettings}
        />

        <Card title="数据备份">
          <p className="text-sm text-gray-500 mb-4">
            定期备份库存数据，确保数据安全。
          </p>
          {/* Add backup settings here */}
        </Card>

        <Card title="系统参数">
          <p className="text-sm text-gray-500 mb-4">
            配置系统基本参数和运行环境。
          </p>
          {/* Add system settings here */}
        </Card>
      </div>
    </div>
  );
};

export default InventorySettingsPage;