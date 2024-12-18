import { useState } from 'react';
import { ProcurementOrder } from '../../types';
import { downloadOrdersExcel } from '../../utils/procurement/orderExport';

export const useOrderExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportOrders = async (orders: ProcurementOrder[]): Promise<void> => {
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate processing
      downloadOrdersExcel(orders);
    } catch (error) {
      console.error('Error exporting orders:', error);
      throw error;
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    exportOrders
  };
};

export default useOrderExport;