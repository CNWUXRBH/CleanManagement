import React from 'react';
import { Wrench, Calendar, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'overdue' | 'completed';
  priority: 'high' | 'medium' | 'low';
  assignee?: {
    name: string;
    avatar: string;
  };
  checklist: {
    id: string;
    task: string;
    completed: boolean;
  }[];
}

interface MaintenanceReminderProps {
  tasks: MaintenanceTask[];
  onComplete: (taskId: string) => void;
  onChecklistItemToggle: (taskId: string, itemId: string) => void;
}

const MaintenanceReminder: React.FC<MaintenanceReminderProps> = ({
  tasks,
  onComplete,
  onChecklistItemToggle,
}) => {
  const getStatusIcon = (status: MaintenanceTask['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'overdue':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusStyles = (status: MaintenanceTask['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-100';
      case 'overdue':
        return 'bg-red-50 border-red-100';
      default:
        return 'bg-yellow-50 border-yellow-100';
    }
  };

  const getPriorityBadge = (priority: MaintenanceTask['priority']) => {
    const styles = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-blue-100 text-blue-700',
    };

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${styles[priority]}`}>
        {priority === 'high' ? '高' : priority === 'medium' ? '中' : '低'}优先级
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`border rounded-lg p-4 ${getStatusStyles(
            task.status
          )} transition-all duration-200 hover:shadow-sm`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Wrench className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                  {getPriorityBadge(task.priority)}
                </div>
                <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{task.dueDate}</span>
                  </div>
                  {task.assignee && (
                    <div className="flex items-center space-x-2">
                      <img
                        src={task.assignee.avatar}
                        alt={task.assignee.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span>{task.assignee.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusIcon(task.status)}
              {task.status !== 'completed' && (
                <button
                  onClick={() => onComplete(task.id)}
                  className="px-3 py-1 text-sm text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  完成
                </button>
              )}
            </div>
          </div>

          {/* 检查清单 */}
          <div className="mt-4 space-y-2">
            {task.checklist.map((item) => (
              <label
                key={item.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/50 transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onChecklistItemToggle(task.id, item.id)}
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span
                  className={`text-sm ${
                    item.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                  }`}
                >
                  {item.task}
                </span>
              </label>
            ))}
          </div>

          {/* 进度指示器 */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>完成进度</span>
              <span>
                {task.checklist.filter((item) => item.completed).length} /{' '}
                {task.checklist.length}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-300"
                style={{
                  width: `${
                    (task.checklist.filter((item) => item.completed).length /
                      task.checklist.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MaintenanceReminder; 