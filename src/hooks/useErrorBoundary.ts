import { useState, useCallback } from 'react';
import { logger } from '../utils/logger';
import useGlobalNotification from './useGlobalNotification';

export const useErrorBoundary = () => {
  const [error, setError] = useState<Error | null>(null);
  const { addNotification } = useGlobalNotification();

  const handleError = useCallback((error: Error) => {
    logger.error('Application error:', error);
    setError(error);
    addNotification({
      type: 'error',
      message: '系统发生错误，请刷新页面重试',
      duration: 0,
    });
  }, [addNotification]);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    resetError,
  };
};

export default useErrorBoundary;