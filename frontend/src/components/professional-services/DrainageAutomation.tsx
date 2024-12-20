import React, { useMemo } from 'react';
import { DrainageService } from '../../types/services';
import { format, addDays, isAfter } from 'date-fns';
import { AlertTriangle, Calendar, Users } from 'lucide-react';
import { cn } from '../../utils/cn';

interface DrainageAutomationProps {
  services: DrainageService[];
  teams: Array<{
    id: string;
    name: string;
    contact: string;
    specialization: string[];
    currentLoad: number;
    maxLoad: number;
  }>;
  onAssignTeam: (serviceId: string, teamId: string) => void;
  onScheduleService: (serviceId: string, date: Date) => void;
}

const DrainageAutomation: React.FC<DrainageAutomationProps> = ({
  services,
  teams,
  onAssignTeam,
  onScheduleService,
}) => {
  // 智能派单建议
  const teamAssignmentSuggestions = useMemo(() => {
    return services
      .filter(service => !service.assignedTeam && service.status === 'pending')
      .map(service => {
        // 根据管道类型和优先级选择合适的团队
        const suitableTeams = teams
          .filter(team => 
            team.specialization.includes(service.drainageType) &&
            team.currentLoad < team.maxLoad
          )
          .sort((a, b) => {
            // 优先考虑当前负载较低的团队
            const loadScoreA = a.currentLoad / a.maxLoad;
            const loadScoreB = b.currentLoad / b.maxLoad;
            return loadScoreA - loadScoreB;
          });

        return {
          service,
          suggestedTeam: suitableTeams[0],
          reason: suitableTeams[0]
            ? `团队 ${suitableTeams[0].name} 专门处理${
                service.drainageType === 'rainwater' ? '雨水管'
                : service.drainageType === 'sewage' ? '污水管'
                : '雨污合流管'
              }问题，且当前工作负载较低`
            : '暂无合适团队',
        };
      });
  }, [services, teams]);

  // 智能排程建议
  const schedulingSuggestions = useMemo(() => {
    const today = new Date();

    return services
      .filter(service => 
        service.status === 'pending' && 
        service.assignedTeam && 
        !service.scheduledDate
      )
      .map(service => {
        // 根据优先级确定建议的处理时间范围
        const priorityDays = {
          urgent: 1,
          high: 3,
          medium: 7,
          low: 14,
        };

        const suggestedDate = addDays(today, priorityDays[service.priority]);
        
        return {
          service,
          suggestedDate,
          reason: `根据${
            service.priority === 'urgent' ? '紧急'
            : service.priority === 'high' ? '高'
            : service.priority === 'medium' ? '中'
            : '低'
          }优先级，建议在 ${format(suggestedDate, 'yyyy-MM-dd')} 前完成处理`,
        };
      });
  }, [services]);

  // 预警提醒
  const warnings = useMemo(() => {
    const today = new Date();
    
    return services
      .filter(service => service.status !== 'completed' && service.status !== 'cancelled')
      .reduce<Array<{ service: DrainageService; type: string; message: string }>>((acc, service) => {
        // 检查是否有超期未处理的服务
        if (service.scheduledDate && isAfter(today, service.scheduledDate)) {
          acc.push({
            service,
            type: 'overdue',
            message: `服务已超过预定处理时间 ${format(service.scheduledDate, 'yyyy-MM-dd')}`,
          });
        }

        // 检查高优先级但未分配团队的服务
        if ((service.priority === 'urgent' || service.priority === 'high') && !service.assignedTeam) {
          acc.push({
            service,
            type: 'unassigned',
            message: `高优先级服务尚未分配处理团队`,
          });
        }

        // 检查堵塞程度高的服务
        if (service.blockageLevel >= 8) {
          acc.push({
            service,
            type: 'critical',
            message: `管道堵塞程度严重 (${service.blockageLevel}/10)，建议尽快处理`,
          });
        }

        return acc;
      }, []);
  }, [services]);

  return (
    <div className="space-y-8">
      {/* 智能派单建议 */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-medium text-gray-900">智能派单建议</h3>
        </div>
        <div className="space-y-4">
          {teamAssignmentSuggestions.map(({ service, suggestedTeam, reason }) => (
            <div
              key={service.id}
              className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {service.location} - {reason}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  管道类型: {
                    service.drainageType === 'rainwater' ? '雨水管'
                    : service.drainageType === 'sewage' ? '污水管'
                    : '雨污合流管'
                  }
                </p>
              </div>
              {suggestedTeam && (
                <button
                  onClick={() => onAssignTeam(service.id, suggestedTeam.id)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  分配团队
                </button>
              )}
            </div>
          ))}
          {teamAssignmentSuggestions.length === 0 && (
            <p className="text-sm text-gray-500">暂无需要分配团队的服务</p>
          )}
        </div>
      </div>

      {/* 智能排程建议 */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-medium text-gray-900">智能排程建议</h3>
        </div>
        <div className="space-y-4">
          {schedulingSuggestions.map(({ service, suggestedDate, reason }) => (
            <div
              key={service.id}
              className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {service.location} - {reason}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  处理团队: {service.assignedTeam?.name}
                </p>
              </div>
              <button
                onClick={() => onScheduleService(service.id, suggestedDate)}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                安排时间
              </button>
            </div>
          ))}
          {schedulingSuggestions.length === 0 && (
            <p className="text-sm text-gray-500">暂无需要排程的服务</p>
          )}
        </div>
      </div>

      {/* 预警提醒 */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-medium text-gray-900">预警提醒</h3>
        </div>
        <div className="space-y-4">
          {warnings.map((warning, index) => (
            <div
              key={`${warning.service.id}-${index}`}
              className={cn(
                'p-4 rounded-lg',
                warning.type === 'overdue' ? 'bg-red-50'
                : warning.type === 'unassigned' ? 'bg-yellow-50'
                : 'bg-orange-50'
              )}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <p className={cn(
                    'text-sm font-medium',
                    warning.type === 'overdue' ? 'text-red-800'
                    : warning.type === 'unassigned' ? 'text-yellow-800'
                    : 'text-orange-800'
                  )}>
                    {warning.message}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    位置: {warning.service.location}
                  </p>
                  {warning.service.assignedTeam && (
                    <p className="text-sm text-gray-600">
                      处理团队: {warning.service.assignedTeam.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {warnings.length === 0 && (
            <p className="text-sm text-gray-500">暂无预警信息</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DrainageAutomation; 