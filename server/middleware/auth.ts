
import { Request, Response, NextFunction } from 'express';
import { verifyToken, extractTokenFromHeader, type AuthUser } from '../services/auth';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = extractTokenFromHeader(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  req.user = decoded as AuthUser;
  next();
}

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const token = extractTokenFromHeader(req.headers.authorization);

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      req.user = decoded as AuthUser;
    }
  }

  next();
}
