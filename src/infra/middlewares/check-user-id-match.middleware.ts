import { Request, Response, NextFunction } from 'express';

export function checkUserIdMatch(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const paramUserId = req.params.userId || (req.body.userId as string);

  try {
    if (userId !== paramUserId) {
      return res.status(403).json({ message: 'Forbidden access' });
    }
    return next();
  } catch (error) {
    return res.status(402).json({ message: 'Invalid token' });
  }
}
