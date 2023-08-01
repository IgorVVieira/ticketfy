import { Request, Response, NextFunction } from "express";

export function checkUserIdMatch(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.userId;
  const paramUserId = req.params.userId;

  console.log(userId, paramUserId);

  try {
    if (userId !== paramUserId) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    return next();
  } catch (error: any) {
    return res.status(402).json({ message: "Invalid token" });
  }
}
