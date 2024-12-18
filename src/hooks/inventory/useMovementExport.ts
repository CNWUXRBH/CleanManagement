import { useState } from 'react';
import { InventoryMovement } from '../../types/inventory';
import { generateMovementReport, downloadReport } from '../../utils/reports/inventoryReports';

export const useMovementExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportMovements = async (movements: InventoryMovement[]): Promise<void> => {
    setIsExporting(true);
    try {
      const report = generateMovementReport(movements, { includeHeaders: true });
      const filename = `库存移动记录_${new Date().toISOString().split('T')[0]}.csv`;
      downloadReport(report, filename);
    } catch (error) {
      console.error('Error exporting movements:', error);
      throw error;
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    exportMovements
  };
};

export default useMovementExport;