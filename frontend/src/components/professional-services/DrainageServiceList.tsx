import React from 'react';
import { DrainageService, ServiceStatus } from '../../types/services';
import { format } from 'date-fns';
import { cn } from '../../utils/cn';

interface DrainageServiceListProps {
  services: DrainageService[];
  onServiceClick?: (service: DrainageService) => void;
}

const statusColors: Record<ServiceStatus, { bg: string; text: string; border: string }> = {
  pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  in_progress: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  completed: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
  cancelled: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' },
};

const statusText: Record<ServiceStatus, string> = {
  pending: '待处理',
  in_progress: '处理中',
  completed: '已完成',
  cancelled: '已取消',
};

const DrainageServiceList: React.FC<DrainageServiceListProps> = ({
  services,
  onServiceClick,
}) => {
  const renderStatus = (status: ServiceStatus) => {
    const colors = statusColors[status];
    return (
      <span className={cn(
        'px-2.5 py-0.5 rounded-full text-xs font-medium',
        colors.bg,
        colors.text,
        colors.border,
        'border'
      )}>
        {statusText[status]}
      </span>
    );
  };

  const renderPriorityIndicator = (priority: DrainageService['priority']) => {
    const colors = {
      urgent: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500',
    };

    return (
      <div className="flex items-center gap-1.5">
        <div className={cn('w-2 h-2 rounded-full', colors[priority])} />
        <span className="text-xs text-gray-600">
          {priority === 'urgent' ? '紧急'
            : priority === 'high' ? '高'
            : priority === 'medium' ? '中'
            : '低'}
        </span>
      </div>
    );
  };

  if (services.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg">
        <div className="text-gray-500">暂无服务记录</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {services.map((service) => (
          <li
            key={service.id}
            className={cn(
              'hover:bg-gray-50 transition-colors duration-150 cursor-pointer',
              'p-4 sm:p-6'
            )}
            onClick={() => onServiceClick?.(service)}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* 左侧信息 */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {service.location}
                  </h3>
                  {renderStatus(service.status)}
                  {renderPriorityIndicator(service.priority)}
                </div>
                
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:gap-x-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <span>管道类型:</span>
                    <span className="font-medium">
                      {service.drainageType === 'rainwater' ? '雨水管'
                        : service.drainageType === 'sewage' ? '污水管'
                        : '雨污合流管'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>管线类型:</span>
                    <span className="font-medium">
                      {service.pipelineType === 'main' ? '主管道'
                        : service.pipelineType === 'branch' ? '支管道'
                        : '连接管'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>管径:</span>
                    <span className="font-medium">{service.pipelineDiameter}mm</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>长度:</span>
                    <span className="font-medium">{service.estimatedLength}米</span>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-700 line-clamp-2">
                  {service.description}
                </div>
              </div>

              {/* 右侧信息 */}
              <div className="flex flex-col items-end gap-2 text-sm text-gray-500">
                <div>申请时间: {format(new Date(service.requestDate), 'yyyy-MM-dd HH:mm')}</div>
                {service.scheduledDate && (
                  <div>计划时间: {format(new Date(service.scheduledDate), 'yyyy-MM-dd HH:mm')}</div>
                )}
                {service.completionDate && (
                  <div>完成时间: {format(new Date(service.completionDate), 'yyyy-MM-dd HH:mm')}</div>
                )}
                <div className="font-medium text-gray-900">
                  预计费用: ¥{service.estimatedCost.toFixed(2)}
                </div>
                {service.actualCost !== undefined && (
                  <div className="font-medium text-gray-900">
                    实际费用: ¥{service.actualCost.toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            {/* 申请人信息 */}
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <div>申请人: {service.requester.name}</div>
              <div>部门: {service.requester.department}</div>
              <div>联系方式: {service.requester.contact}</div>
            </div>

            {/* 处理团队信息 */}
            {service.assignedTeam && (
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                <div>处理团队: {service.assignedTeam.name}</div>
                <div>联系方式: {service.assignedTeam.contact}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrainageServiceList; 