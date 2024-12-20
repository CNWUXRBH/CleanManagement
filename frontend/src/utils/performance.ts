import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';
import { Metric, ReportHandler } from 'web-vitals';

interface PerformanceMetrics {
  timeToFirstByte: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
}

export const initPerformanceMonitoring = () => {
  // Initialize Sentry with performance monitoring
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [
      new BrowserTracing({
        tracingOrigins: ['localhost', /^\//],
        beforeNavigate: (context) => {
          return {
            ...context,
            tags: {
              ...context.tags,
              'environment': process.env.NODE_ENV,
            },
          };
        },
      }) as any,
    ],
    tracesSampleRate: 1.0,
  });

  // Web Vitals monitoring
  if ('web-vitals' in window) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(sendToAnalytics);
      getFID(sendToAnalytics);
      getFCP(sendToAnalytics);
      getLCP(sendToAnalytics);
      getTTFB(sendToAnalytics);
    });
  }
};

// Custom performance mark
export const markPerformance = (name: string) => {
  if (performance.mark) {
    performance.mark(name);
  }
};

// Custom performance measure
export const measurePerformance = (name: string, startMark: string, endMark: string) => {
  if (performance.measure) {
    try {
      performance.measure(name, startMark, endMark);
      const entries = performance.getEntriesByName(name);
      if (entries.length > 0) {
        const entry = entries[0];
        Sentry.addBreadcrumb({
          category: 'performance',
          message: `${name}: ${entry.duration}ms`,
          level: 'info',
        });
        console.log('Performance measure:', {
          name,
          duration: entry.duration,
          startTime: entry.startTime,
        });
      }
    } catch (e) {
      console.error('Error measuring performance:', e);
    }
  }
};

// Track component render time
export const trackComponentPerformance = (componentName: string) => {
  const startMark = `${componentName}-start`;
  const endMark = `${componentName}-end`;
  
  markPerformance(startMark);
  
  return () => {
    markPerformance(endMark);
    measurePerformance(`${componentName}-render`, startMark, endMark);
  };
};

// Send metrics to analytics
const sendToAnalytics: ReportHandler = (metric: Metric) => {
  // Send to Sentry
  Sentry.addBreadcrumb({
    category: 'web-vitals',
    message: `${metric.name}: ${metric.value}`,
    level: 'info',
    data: {
      id: metric.id,
      value: metric.value,
      delta: metric.delta,
      entries: metric.entries,
    },
  });

  // TODO: Send to other analytics services
  console.log('Web Vitals metric:', {
    name: metric.name,
    value: Math.round(metric.value * 100) / 100,
    id: metric.id,
    delta: metric.delta,
  });
};

// Get current performance metrics
export const getCurrentPerformanceMetrics = (): Partial<PerformanceMetrics> => {
  const metrics: Partial<PerformanceMetrics> = {};

  if (performance.timing) {
    metrics.timeToFirstByte = performance.timing.responseStart - performance.timing.navigationStart;
  }

  const paintEntries = performance.getEntriesByType('paint');
  paintEntries.forEach((entry) => {
    if (entry.name === 'first-contentful-paint') {
      metrics.firstContentfulPaint = entry.startTime;
    }
  });

  return metrics;
};