import { useState, useEffect } from 'react';

export const useInventoryAdjustments = () => {
  const [adjustments, setAdjustments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdjustments = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockAdjustments = [
          {
            id: '1',
            date: '2024-03-01',
            adjustments: [
              { itemId: '1', systemStock: 100, actualStock: 95 },
              { itemId: '2', systemStock: 200, actualStock: 205 }
            ],
            surplus: 5,
            shortage: 5,
            status: 'pending'
          },
          {
            id: '2',
            date: '2024-03-02',
            adjustments: [
              { itemId: '3', systemStock: 150, actualStock: 148 }
            ],
            surplus: 0,
            shortage: 2,
            status: 'completed'
          }
        ];
        
        setAdjustments(mockAdjustments);
      } catch (error) {
        console.error('Error fetching adjustments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdjustments();
  }, []);

  const addAdjustment = async (adjustment: any) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newAdjustment = {
        id: Date.now().toString(),
        ...adjustment,
        surplus: adjustment.adjustments.reduce((sum: number, item: any) => 
          sum + Math.max(0, item.actualStock - item.systemStock), 0),
        shortage: adjustment.adjustments.reduce((sum: number, item: any) => 
          sum + Math.max(0, item.systemStock - item.actualStock), 0)
      };
      
      setAdjustments([newAdjustment, ...adjustments]);
      return true;
    } catch (error) {
      console.error('Error adding adjustment:', error);
      return false;
    }
  };

  return {
    adjustments,
    isLoading,
    addAdjustment
  };
};

export default useInventoryAdjustments;