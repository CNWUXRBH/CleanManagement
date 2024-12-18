import React from 'react';
import AlertSettings from '../alerts/AlertSettings';
import useAlertSettings from '../../../hooks/inventory/useAlertSettings';
import Card from '../../shared/Card';

const InventorySettings: React.FC = () => {
  const { settings, updateSettings } = useAlertSettings();

  const handleSaveSettings = async (newSettings: any) => {
    const success = await updateSettings(newSettings);
    if (success) {
      // Show success message
      console.log('Settings saved successfully');
    }
  };

  return (
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
  );
};

export default InventorySettings;