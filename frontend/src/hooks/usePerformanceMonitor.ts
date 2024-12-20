import { useEffect, useRef } from 'react';
import { markPerformance, measurePerformance } from '../utils/performance';

interface PerformanceMonitorOptions {
  componentName: string;
  trackProps?: boolean;
  trackRenders?: boolean;
  trackEffects?: boolean;
}

export const usePerformanceMonitor = ({
  componentName,
  trackProps = true,
  trackRenders = true,
  trackEffects = true,
}: PerformanceMonitorOptions) => {
  const renderCount = useRef(0);
  const lastPropsRef = useRef<Record<string, unknown>>({});

  useEffect(() => {
    if (trackRenders) {
      renderCount.current += 1;
      markPerformance(`${componentName}-render-${renderCount.current}`);
    }

    return () => {
      if (trackRenders) {
        measurePerformance(
          `${componentName}-render-time-${renderCount.current}`,
          `${componentName}-render-${renderCount.current}`,
          `${componentName}-render-${renderCount.current}`
        );
      }
    };
  });

  const trackPropChanges = (props: Record<string, unknown>) => {
    if (!trackProps) return;

    const changes: string[] = [];
    Object.entries(props).forEach(([key, value]) => {
      if (lastPropsRef.current[key] !== value) {
        changes.push(key);
      }
    });

    if (changes.length > 0) {
      console.log(`[Performance] ${componentName} props changed:`, changes);
      markPerformance(`${componentName}-props-change`);
    }

    lastPropsRef.current = { ...props };
  };

  const trackEffect = (effectName: string, callback: () => void | (() => void)) => {
    if (!trackEffects) return callback;

    return () => {
      markPerformance(`${componentName}-${effectName}-start`);
      const cleanup = callback();
      markPerformance(`${componentName}-${effectName}-end`);
      measurePerformance(
        `${componentName}-${effectName}-duration`,
        `${componentName}-${effectName}-start`,
        `${componentName}-${effectName}-end`
      );

      return cleanup;
    };
  };

  return {
    trackPropChanges,
    trackEffect,
    renderCount: renderCount.current,
  };
};

export default usePerformanceMonitor;