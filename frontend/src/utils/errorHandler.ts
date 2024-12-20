import * as Sentry from '@sentry/react';
import useStore from '../store';

interface ErrorOptions {
  context?: Record<string, unknown>;
  shouldNotify?: boolean;
  level?: 'error' | 'warning' | 'info';
  showToast?: boolean;
}

export class AppError extends Error {
  constructor(
    message: string,
    public code?: string,
    public metadata?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: unknown): AppError => {
  // 如果已经是 AppError，直接返回
  if (error instanceof AppError) {
    return error;
  }

  // 处理 API 响应错误
  if (error instanceof Response) {
    return new AppError(
      'API request failed',
      `${error.status}`,
      { status: error.status, statusText: error.statusText }
    );
  }

  // 处理网络错误
  if (error instanceof TypeError && error.message === 'Failed to fetch') {
    return new AppError('Network error', 'NETWORK_ERROR');
  }

  // 处理其他错误
  return new AppError(
    error instanceof Error ? error.message : 'An unknown error occurred',
    'UNKNOWN_ERROR'
  );
};

export const handleError = (
  error: Error | AppError,
  options: ErrorOptions = {}
) => {
  const { context = {}, shouldNotify = true, level = 'error', showToast = true } = options;
  
  // Log error
  console.error('[Error]:', {
    message: error.message,
    code: (error as AppError).code,
    metadata: (error as AppError).metadata,
    context,
  });

  // Report to Sentry if needed
  if (shouldNotify) {
    Sentry.withScope((scope: Sentry.Scope) => {
      scope.setLevel(level);
      scope.setContext('error_context', context);
      if (error instanceof AppError) {
        scope.setTag('error_code', error.code || 'unknown');
        scope.setExtras(error.metadata || {});
      }
      Sentry.captureException(error);
    });
  }

  // Show user notification if needed
  if (showToast) {
    const store = useStore.getState();
    if (store.showToast) {
      store.showToast({
        type: 'error',
        message: error.message,
      });
    }
  }

  return error;
};

export const initErrorHandling = () => {
  // Initialize Sentry
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
    beforeSend(event) {
      // Don't send errors in development
      if (process.env.NODE_ENV === 'development') {
        return null;
      }
      return event;
    },
  });

  // Global error handlers
  window.onerror = (message, source, lineno, colno, error) => {
    handleError(error || new Error(message as string), {
      context: { source, lineno, colno },
    });
  };

  window.onunhandledrejection = (event: PromiseRejectionEvent) => {
    handleError(event.reason, {
      context: { type: 'unhandled_rejection' },
    });
  };
};