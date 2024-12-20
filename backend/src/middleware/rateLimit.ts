import rateLimit from 'express-rate-limit';

// 创建通用的速率限制器
const createRateLimiter = (windowMs: number, max: number, message: string) =>
  rateLimit({
    windowMs,
    max,
    message: { message },
    standardHeaders: true,
    legacyHeaders: false,
  });

// API 全局限制
export const apiLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // 每个IP限制100次请求
  'Too many requests from this IP, please try again after 15 minutes',
);

// 登录限制
export const loginLimiter = createRateLimiter(
  60 * 60 * 1000, // 1 hour
  5, // 每小时限制5次登录尝试
  'Too many login attempts, please try again after an hour',
);

// 注册限制
export const registerLimiter = createRateLimiter(
  60 * 60 * 1000, // 1 hour
  3, // 每小时限制3次注册尝试
  'Too many registration attempts, please try again after an hour',
);

// 敏感操作限制
export const sensitiveOpLimiter = createRateLimiter(
  60 * 60 * 1000, // 1 hour
  10, // 每小时限制10次敏感操作
  'Too many sensitive operations, please try again after an hour',
); 