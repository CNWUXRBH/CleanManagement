import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: JwtPayload & {
    id: string;
    role: string;
  };
}


export type RequestHandler<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any,
  Locals extends Record<string, any> = Record<string, any>
> = (
  req: Request<P, ResBody, ReqBody, ReqQuery>,
  res: Response<ResBody, Locals>,
  next: NextFunction
) => void | Promise<void>;

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & {
        id: string;
        role: string;
      };
    }

    interface Response {
      json(data: any): this;
      status(code: number): this;
      send(data?: any): this;
    }
  }
} 