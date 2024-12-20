import { Request, Response, NextFunction } from 'express';

const logger = {
  info: console.log,
  error: console.error,
  warn: console.warn,
  debug: console.debug,
};


export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

export const errorLogger = (err: Error, req: Request, _res: Response, next: NextFunction) => {
  logger.error('Error:', {
    error: {
      name: err.name,
      message: err.message,
      stack: err.stack,
    },
    request: {
      method: req.method,
      url: req.url,
      query: req.query,
      body: req.body,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    },
  });
  next(err);
};

export default logger; 