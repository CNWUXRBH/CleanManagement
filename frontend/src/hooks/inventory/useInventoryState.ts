import { useState, useCallback } from 'react';
import { Item } from '../../types';
import useInventoryItems from './useInventoryItems';
import useInventoryStatistics from './useInventoryStatistics';
import { generateInventoryReport, downloadReport } from '../../utils/reports/inventoryReports';

export const useInventoryState = () => {
  const [showImportModal, setShowImportModal] = useState(false);
  const { items, isLoading: itemsLoading, addItem, updateItem, deleteItem } = useInventoryItems();
  const statistics = useInventoryStatistics(items);

  const handleImport = useCallback(async (data: any[]) => {
    // Implementation for import
    return true;
  }, []);

  const handleExport = useCallback(() => {
    const report = generateInventoryReport(items, { includeHeaders: true });
    downloadReport(report, `库存报表_${new Date().toISOString().split('T')[0]}.csv`);
  }, [items]);

  return {
    items,
    itemsLoading,
    statistics,
    showImportModal,
    addItem,
    updateItem,
    deleteItem,
    handleImport,
    handleExport,
    setShowImportModal
  };
};

export default useInventoryState;