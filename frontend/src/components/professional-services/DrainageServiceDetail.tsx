import React from 'react';
import { DrainageService } from '../../types/services';
import { format } from 'date-fns';
import { cn } from '../../utils/cn';
import { Camera, FileText, Wrench, Package } from 'lucide-react';

interface DrainageServiceDetailProps {
  service: DrainageService;
}

const DrainageServiceDetail: React.FC<DrainageServiceDetailProps> = ({
  service,
}) => {
  const statusColors = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    in_progress: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-green-50 text-green-700 border-green-200',
    cancelled: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  const priorityColors = {
    urgent: 'bg-red-50 text-red-700 border-red-200',
    high: 'bg-orange-50 text-orange-700 border-orange-200',
    medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    low: 'bg-green-50 text-green-700 border-green-200',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* 头部信息 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">服务详情</h2>
          <div className="flex items-center gap-3">
            <span className={cn(
              'px-3 py-1 rounded-full text-sm font-medium border',
              statusColors[service.status]
            )}>
              {service.status === 'pending' ? '待处理'
                : service.status === 'in_progress' ? '处理中'
                : service.status === 'completed' ? '已完成'
                : '已取消'}
            </span>
            <span className={cn(
              'px-3 py-1 rounded-full text-sm font-medium border',
              priorityColors[service.priority]
            )}>
              {service.priority === 'urgent' ? '紧急'
                : service.priority === 'high' ? '高优先级'
                : service.priority === 'medium' ? '中优先级'
                : '低优先级'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 基本信息 */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">位置</h3>
              <p className="mt-1 text-sm text-gray-900">{service.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">管道类型</h3>
              <p className="mt-1 text-sm text-gray-900">
                {service.drainageType === 'rainwater' ? '雨水管'
                  : service.drainageType === 'sewage' ? '污水管'
                  : '雨污合流管'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">管线类型</h3>
              <p className="mt-1 text-sm text-gray-900">
                {service.pipelineType === 'main' ? '主管道'
                  : service.pipelineType === 'branch' ? '支管道'
                  : '连接管'}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">管道规格</h3>
              <div className="mt-1 text-sm text-gray-900">
                <p>管径: {service.pipelineDiameter}mm</p>
                <p>长度: {service.estimatedLength}米</p>
                <p>堵塞程度: {service.blockageLevel}/10</p>
              </div>
            </div>
          </div>

          {/* 时间和费用信息 */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">申请时间</h3>
              <p className="mt-1 text-sm text-gray-900">
                {format(new Date(service.requestDate), 'yyyy-MM-dd HH:mm')}
              </p>
            </div>
            {service.scheduledDate && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">计划时间</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {format(new Date(service.scheduledDate), 'yyyy-MM-dd HH:mm')}
                </p>
              </div>
            )}
            {service.completionDate && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">完成时间</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {format(new Date(service.completionDate), 'yyyy-MM-dd HH:mm')}
                </p>
              </div>
            )}
            <div>
              <h3 className="text-sm font-medium text-gray-500">费用信息</h3>
              <div className="mt-1 text-sm">
                <p className="text-gray-900">预计费用: ¥{service.estimatedCost.toFixed(2)}</p>
                {service.actualCost !== undefined && (
                  <p className="text-gray-900">实际费用: ¥{service.actualCost.toFixed(2)}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 问题描述 */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">问题描述</h3>
        </div>
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{service.description}</p>
      </div>

      {/* 申请人信息 */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900 mb-4">申请��信息</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">姓名：</span>
            <span className="text-gray-900">{service.requester.name}</span>
          </div>
          <div>
            <span className="text-gray-500">部门：</span>
            <span className="text-gray-900">{service.requester.department}</span>
          </div>
          <div>
            <span className="text-gray-500">联系方式：</span>
            <span className="text-gray-900">{service.requester.contact}</span>
          </div>
        </div>
      </div>

      {/* 处理团队信息 */}
      {service.assignedTeam && (
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">处理团队信息</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">团队名称：</span>
              <span className="text-gray-900">{service.assignedTeam.name}</span>
            </div>
            <div>
              <span className="text-gray-500">联系方式：</span>
              <span className="text-gray-900">{service.assignedTeam.contact}</span>
            </div>
          </div>
        </div>
      )}

      {/* 使用的设备和材料 */}
      {((service.equipmentUsed && service.equipmentUsed.length > 0) || 
        (service.materialsUsed && service.materialsUsed.length > 0)) && (
        <div className="p-6 border-b border-gray-200">
          {service.equipmentUsed && service.equipmentUsed.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Wrench className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900">使用设备</h3>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {service.equipmentUsed.map((equipment, index) => (
                  <li key={index}>{equipment}</li>
                ))}
              </ul>
            </div>
          )}

          {service.materialsUsed && service.materialsUsed.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900">使用材料</h3>
              </div>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {service.materialsUsed.map((material) => (
                  <li key={material.id}>
                    {material.name} - {material.quantity} {material.unit}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 现场照片 */}
      {((service.beforePhotos && service.beforePhotos.length > 0) || 
        (service.afterPhotos && service.afterPhotos.length > 0)) && (
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">现场照片</h3>
          </div>

          {service.beforePhotos && service.beforePhotos.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">处理前</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {service.beforePhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`处理前照片 ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {service.afterPhotos && service.afterPhotos.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">处理后</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {service.afterPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`处理后照片 ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 维护记录 */}
      {service.maintenanceHistory && service.maintenanceHistory.length > 0 && (
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">维护记录</h3>
          <div className="space-y-4">
            {service.maintenanceHistory.map((record, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">
                      {record.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {format(new Date(record.date), 'yyyy-MM-dd HH:mm')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{record.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    处理人: {record.performedBy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 备注信息 */}
      {service.remarks && (
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">备注</h3>
          <p className="text-sm text-gray-700 whitespace-pre-wrap">{service.remarks}</p>
        </div>
      )}
    </div>
  );
};

export default DrainageServiceDetail; 