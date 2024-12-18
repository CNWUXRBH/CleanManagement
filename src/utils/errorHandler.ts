import { logger } from './logger';

interface ErrorDetails {
  code: string;
  message: string;
  data?: any;
}

class AppError extends Error {
  code: string;
  data?: any;

  constructor({ code, message, data }: ErrorDetails) {
    super(message);
    this.code = code;
    this.data = data;
    this.name = 'AppError';
  }
}

export const handleApiError = (error: any): AppError => {
  logger.error('API Error:', error);

  if (error instanceof AppError) {
    return error;
  }

  // 处理网络错误
  if (error.name === 'NetworkError') {
    return new AppError({
      code: 'NETWORK_ERROR',
      message: '网络连接失败，请检查网络设置',
    });
  }

  // 处理API响应错误
  if (error.response) {
    const { status } = error.response;
    switch (status) {
      case 401:
        return new AppError({
          code: 'UNAUTHORIZED',
          message: '用户未登录或会话已过期',
        });
      case 403:
        return new AppError({
          code: 'FORBIDDEN',
          message: '没有操作权限',
        });
      case 404:
        return new AppError({
          code: 'NOT_FOUND',
          message: '请求的资源不存在',
        });
      case 500:
        return new AppError({
          code: 'SERVER_ERROR',
          message: '服务器内部错误',
        });
      default:
        return new AppError({
          code: 'UNKNOWN_ERROR',
          message: '未知错误',
          data: error.response.data,
        });
    }
  }

  return new AppError({
    code: 'UNKNOWN_ERROR',
    message: '发生未知错误',
    data: error,
  });
};

export const createErrorHandler = (context: string) => {
  return (error: any) => {
    logger.error(`Error in ${context}:`, error);
    return handleApiError(error);
  };
};

export { AppError };