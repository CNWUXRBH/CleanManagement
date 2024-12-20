import React, { useMemo } from 'react';
import { DrainageService } from '../../types/services';
import { format } from 'date-fns';
import { FileText, Download, Printer } from 'lucide-react';
import { cn } from '../../utils/cn';

interface DrainageReportsProps {
  services: DrainageService[];
  onExportPDF?: () => void;
  onPrint?: () => void;
}

const DrainageReports: React.FC<DrainageReportsProps> = ({
  services,
  onExportPDF,
  onPrint,
}) => {
  // 生成服务报告数据
  const serviceReport = useMemo(() => {
    const completedServices = services.filter(
      service => service.status === 'completed'
    );

    const totalServices = completedServices.length;
    const totalCost = completedServices.reduce(
      (sum, service) => sum + (service.actualCost || 0),
      0
    );
    const averageProcessingTime = completedServices.reduce((sum, service) => {
      if (service.completionDate) {
        const start = new Date(service.requestDate);
        const end = new Date(service.completionDate);
        return sum + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      }
      return sum;
    }, 0) / totalServices;

    const typeDistribution = completedServices.reduce((acc, service) => {
      acc[service.drainageType] = (acc[service.drainageType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalServices,
      totalCost,
      averageProcessingTime,
      typeDistribution,
    };
  }, [services]);

  // 生成费用报表数据
  const costReport = useMemo(() => {
    const completedServices = services.filter(
      service => service.status === 'completed' && service.actualCost
    );

    const costByType = completedServices.reduce((acc, service) => {
      acc[service.drainageType] = (acc[service.drainageType] || 0) + (service.actualCost || 0);
      return acc;
    }, {} as Record<string, number>);

    const costVariance = completedServices.reduce((acc, service) => {
      const variance = ((service.actualCost || 0) - service.estimatedCost) / service.estimatedCost * 100;
      acc.push({
        id: service.id,
        location: service.location,
        estimated: service.estimatedCost,
        actual: service.actualCost || 0,
        variance,
      });
      return acc;
    }, [] as Array<{
      id: string;
      location: string;
      estimated: number;
      actual: number;
      variance: number;
    }>).sort((a, b) => Math.abs(b.variance) - Math.abs(a.variance));

    return {
      costByType,
      costVariance,
    };
  }, [services]);

  // 生成维护记录报表数据
  const maintenanceReport = useMemo(() => {
    const allMaintenanceRecords = services.reduce((acc, service) => {
      if (service.maintenanceHistory) {
        acc.push(...service.maintenanceHistory.map(record => ({
          ...record,
          serviceId: service.id,
          location: service.location,
          drainageType: service.drainageType,
        })));
      }
      return acc;
    }, [] as Array<{
      date: Date;
      type: string;
      description: string;
      performedBy: string;
      serviceId: string;
      location: string;
      drainageType: string;
    }>).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const maintenanceByType = allMaintenanceRecords.reduce((acc, record) => {
      acc[record.type] = (acc[record.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      records: allMaintenanceRecords,
      maintenanceByType,
    };
  }, [services]);

  return (
    <div className="space-y-8">
      {/* 报告操作按钮 */}
      <div className="flex justify-end gap-4">
        <button
          onClick={onExportPDF}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Download className="w-4 h-4" />
          导出PDF
        </button>
        <button
          onClick={onPrint}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <Printer className="w-4 h-4" />
          打印报告
        </button>
      </div>

      {/* 服务报告 */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900">服务报告</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600 font-medium">总服务数</p>
            <p className="text-2xl font-bold text-blue-900 mt-1">
              {serviceReport.totalServices}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-green-600 font-medium">总费用</p>
            <p className="text-2xl font-bold text-green-900 mt-1">
              ¥{serviceReport.totalCost.toFixed(2)}
            </p>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-600 font-medium">平均处理时间</p>
            <p className="text-2xl font-bold text-yellow-900 mt-1">
              {Math.round(serviceReport.averageProcessingTime)}小时
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-600 font-medium">服务类型分布</p>
            <div className="space-y-1 mt-2">
              {Object.entries(serviceReport.typeDistribution).map(([type, count]) => (
                <div key={type} className="flex justify-between text-sm">
                  <span className="text-purple-700">
                    {type === 'rainwater' ? '雨水管'
                      : type === 'sewage' ? '污水管'
                      : '雨污合流管'}
                  </span>
                  <span className="font-medium text-purple-900">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 费用报表 */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-medium text-gray-900">费用报表</h3>
        </div>

        <div className="space-y-6">
          {/* 按类型费用统计 */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">按类型费用统计</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(costReport.costByType).map(([type, cost]) => (
                <div key={type} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    {type === 'rainwater' ? '雨水管'
                      : type === 'sewage' ? '污水管'
                      : '雨污合流管'}
                  </p>
                  <p className="text-lg font-medium text-gray-900 mt-1">
                    ¥{cost.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 费用偏差分析 */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">费用偏差分析</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      位置
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      预估费用
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      实际费用
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      偏差
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {costReport.costVariance.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥{item.estimated.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ¥{item.actual.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          'px-2 py-1 text-xs font-medium rounded-full',
                          item.variance > 10 ? 'bg-red-100 text-red-800'
                          : item.variance < -10 ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                        )}>
                          {item.variance > 0 ? '+' : ''}{item.variance.toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* 维护记录报表 */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-medium text-gray-900">维护记录报表</h3>
        </div>

        <div className="space-y-6">
          {/* 维护类型统计 */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">维护类型统计</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Object.entries(maintenanceReport.maintenanceByType).map(([type, count]) => (
                <div key={type} className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">{type}</p>
                  <p className="text-lg font-medium text-gray-900 mt-1">{count}次</p>
                </div>
              ))}
            </div>
          </div>

          {/* 维护记录列表 */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">维护记录列表</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      日期
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      位置
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      类型
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      描述
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      处理人
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {maintenanceReport.records.map((record, index) => (
                    <tr key={`${record.serviceId}-${index}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {format(new Date(record.date), 'yyyy-MM-dd HH:mm')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {record.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {record.performedBy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrainageReports; 