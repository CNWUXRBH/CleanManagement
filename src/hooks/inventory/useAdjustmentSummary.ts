import { useState, useEffect } from 'react';

interface AdjustmentSummary {
  totalItems: number;
  totalSurplus: number;
  totalShortage: number;
}

export const useAdjustmentSummary = (adjustments: any[]) => {
  const [summary, setSummary] = useState<AdjustmentSummary>({
    totalItems: 0,
    totalSurplus: 0,
    totalShortage: 0
  });

  useEffect(() => {
    const calculateSummary = () => {
      const newSummary = adjustments.reduce((acc, adjustment) => {
        acc.totalItems += adjustment.adjustments.length;
        acc.totalSurplus += adjustment.surplus || 0;
        acc.totalShortage += adjustment.shortage || 0;
        return acc;
      }, {
        totalItems: 0,
        totalSurplus: 0,
        totalShortage: 0
      });

      setSummary(newSummary);
    };

    calculateSummary();
  }, [adjustments]);

  return summary;
};

export default useAdjustmentSummary;