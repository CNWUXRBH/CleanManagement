import { useState, useEffect } from 'react';

interface WorkflowStep {
  id: string;
  role: string;
  type: 'approval' | 'notification';
  threshold?: number;
}

export const useWorkflow = () => {
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWorkflow = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockSteps: WorkflowStep[] = [
          {
            id: '1',
            role: 'department_manager',
            type: 'approval',
            threshold: 5000
          },
          {
            id: '2',
            role: 'finance_manager',
            type: 'approval',
            threshold: 10000
          },
          {
            id: '3',
            role: 'general_manager',
            type: 'approval',
            threshold: 50000
          }
        ];
        
        setSteps(mockSteps);
      } catch (error) {
        console.error('Error loading workflow:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkflow();
  }, []);

  const saveWorkflow = async (newSteps: WorkflowStep[]): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSteps(newSteps);
      return true;
    } catch (error) {
      console.error('Error saving workflow:', error);
      return false;
    }
  };

  const getNextApprover = (amount: number): string | null => {
    const approvalSteps = steps.filter(step => step.type === 'approval');
    for (const step of approvalSteps) {
      if (!step.threshold || amount <= step.threshold) {
        return step.role;
      }
    }
    return null;
  };

  const getNotificationRecipients = (): string[] => {
    return steps
      .filter(step => step.type === 'notification')
      .map(step => step.role);
  };

  return {
    steps,
    isLoading,
    saveWorkflow,
    getNextApprover,
    getNotificationRecipients
  };
};

export default useWorkflow;