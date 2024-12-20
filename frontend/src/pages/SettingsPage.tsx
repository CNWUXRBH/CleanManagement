import React from 'react';
import Card from '../components/shared/Card';
import AlertSettings from '../components/inventory/alerts/AlertSettings';
import useAlertSettings from '../hooks/inventory/useAlertSettings';

const SettingsPage: React.FC = () => {
  const { settings, updateSettings } = useAlertSettings();

  const handleSaveSettings = async (newSettings: any) => {
    const success = await updateSettings(newSettings);
    if (success) {
      // TODO: 显示成功提示
      console.log('Settings saved successfully');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">系统设置</h1>
        <p className="mt-1 text-sm text-gray-500">
          配置系统参数和预警规则。
        </p>
      </div>

      <div className="space-y-6">
        <Card title="预警设置">
          <AlertSettings
            settings={settings}
            onSave={handleSaveSettings}
          />
        </Card>

        <Card title="数据备份">
          <p className="text-sm text-gray-500 mb-4">
            定期备份库��数据，确保数据安全。
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">自动备份</h4>
                <p className="text-sm text-gray-500">每天凌晨3点自动备份数据</p>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  defaultChecked
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">保留时间</h4>
                <p className="text-sm text-gray-500">自动删除超过指定天数的备份</p>
              </div>
              <select className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="7">7天</option>
                <option value="14">14天</option>
                <option value="30">30天</option>
                <option value="90">90天</option>
              </select>
            </div>
          </div>
        </Card>

        <Card title="系统参数">
          <p className="text-sm text-gray-500 mb-4">
            配置系统基本参数和运行环境。
          </p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">系统名称</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                defaultValue="保洁耗品耗材管理系统"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">每页显示记录数</label>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                <option value="10">10条/页</option>
                <option value="20">20条/页</option>
                <option value="50">50条/页</option>
                <option value="100">100条/页</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage; 