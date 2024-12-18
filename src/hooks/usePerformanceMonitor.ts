import { useEffect } from 'react';
import { logger } from '../utils/logger';
import { measurePerformance } from '../utils/performance';

export const usePerformanceMonitor = () => {
  useEffect(() => {
    // 监控页面加载性能
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        logger.info(`Performance: ${entry.name}`, {
          duration: entry.duration,
          startTime: entry.startTime,
          entryType: entry.entryType,
        });
      });
    });

    observer.observe({ entryTypes: ['navigation', 'resource', 'paint'] });

    return () => observer.disconnect();
  }, []);

  return {
    measurePerformance,
  };
};

export default usePerformanceMonitor;