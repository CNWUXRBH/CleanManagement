import { useState, useEffect } from 'react';

interface AlertRule {
  id: string;
  type: 'low_stock' | 'expiring' | 'consumption';
  name: string;
  condition: string;
  isActive: boolean;
}

export const useAlertRules = () => {
  const [rules, setRules] = useState<AlertRule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRules = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockRules: AlertRule[] = [
          {
            id: '1',
            type: 'low_stock',
            name: '库存不足预警',
            condition: '当库存低于最小库存量时触发',
            isActive: true
          },
          {
            id: '2',
            type: 'expiring',
            name: '过期预警',
            condition: '当物品距离过期不足30天时触发',
            isActive: true
          },
          {
            id: '3',
            type: 'consumption',
            name: '异常消耗预警',
            condition: '当日消耗量超过平均值50%时触发',
            isActive: true
          }
        ];
        
        setRules(mockRules);
      } catch (error) {
        console.error('Error fetching alert rules:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRules();
  }, []);

  const toggleRule = async (id: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRules(rules.map(rule =>
        rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
      ));
      return true;
    } catch (error) {
      console.error('Error toggling rule:', error);
      return false;
    }
  };

  const updateRule = async (id: string, updates: Partial<AlertRule>): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setRules(rules.map(rule =>
        rule.id === id ? { ...rule, ...updates } : rule
      ));
      return true;
    } catch (error) {
      console.error('Error updating rule:', error);
      return false;
    }
  };

  return {
    rules,
    isLoading,
    toggleRule,
    updateRule
  };
};

export default useAlertRules;