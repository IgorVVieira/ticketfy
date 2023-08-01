import { NextFunction, Request, Response } from "express";
import { userPermissionService } from "../shared/container/injection";

export function can(permission: string) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request;

    try {
      const userPermission = await userPermissionService.findByUserIdAndName(
        userId,
        permission
      );
      if (!userPermission) {
        return response.status(401).json({ message: "Permission denied" });
      }
      return next();
    } catch (error) {
      return response.status(401).json({ message: "Permission denied" });
    }
  };
}
