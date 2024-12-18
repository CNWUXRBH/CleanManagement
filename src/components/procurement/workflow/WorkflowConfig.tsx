import React from 'react';
import Card from '../../shared/Card';
import Button from '../../shared/Button';
import { Plus, Save } from 'lucide-react';

interface WorkflowStep {
  id: string;
  role: string;
  type: 'approval' | 'notification';
  threshold?: number;
}

interface WorkflowConfigProps {
  steps: WorkflowStep[];
  onSave: (steps: WorkflowStep[]) => void;
}

const WorkflowConfig: React.FC<WorkflowConfigProps> = ({ steps, onSave }) => {
  const [workflowSteps, setWorkflowSteps] = React.useState(steps);

  const addStep = () => {
    setWorkflowSteps([
      ...workflowSteps,
      {
        id: Date.now().toString(),
        role: '',
        type: 'approval'
      }
    ]);
  };

  const removeStep = (id: string) => {
    setWorkflowSteps(workflowSteps.filter(step => step.id !== id));
  };

  const updateStep = (id: string, updates: Partial<WorkflowStep>) => {
    setWorkflowSteps(workflowSteps.map(step =>
      step.id === id ? { ...step, ...updates } : step
    ));
  };

  return (
    <Card title="审批流程配置">
      <div className="space-y-6">
        {workflowSteps.map((step, index) => (
          <div key={step.id} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">{index + 1}</span>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">审批角色</label>
                  <select
                    value={step.role}
                    onChange={(e) => updateStep(step.id, { role: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                      focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">选择角色</option>
                    <option value="department_manager">部门经理</option>
                    <option value="finance_manager">财务经理</option>
                    <option value="general_manager">总经理</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">步骤类型</label>
                  <select
                    value={step.type}
                    onChange={(e) => updateStep(step.id, { 
                      type: e.target.value as 'approval' | 'notification' 
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                      focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="approval">审批</option>
                    <option value="notification">通知</option>
                  </select>
                </div>
              </div>

              {step.type === 'approval' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    金额阈值（超过此金额需要审批）
                  </label>
                  <input
                    type="number"
                    value={step.threshold || ''}
                    onChange={(e) => updateStep(step.id, { 
                      threshold: parseFloat(e.target.value) 
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                      focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => removeStep(step.id)}
              className="text-red-600 hover:text-red-800"
            >
              删除
            </button>
          </div>
        ))}

        <div className="flex justify-between">
          <Button
            type="button"
            variant="secondary"
            icon={<Plus className="w-4 h-4" />}
            onClick={addStep}
          >
            添加步骤
          </Button>

          <Button
            type="button"
            variant="primary"
            icon={<Save className="w-4 h-4" />}
            onClick={() => onSave(workflowSteps)}
          >
            保存配置
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WorkflowConfig;