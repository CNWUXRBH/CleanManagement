import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export type RequestHandler = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => Promise<void> | void; 