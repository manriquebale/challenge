import User from '../users/users.model'
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Request as ExpressRequest } from 'express';

interface CustomRequest extends ExpressRequest {
  token?: string;
  user?: any;
}

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) return next(res.status(401).json({
      message: 'Missing header authorization'
    }));

    req.token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(req.token, process.env.JWT_SECRET || '') as any;

    if (!decoded) return next(res.status(401).json({
      message: 'Unauthorized'
    }));

    const user = await User.findById(decoded.sub);

    if (user === null) return next(res.status(404).json({
      message: 'Not found'
    }))
    req.user = user;
    next();
  } catch (error) { return next(error); }
};