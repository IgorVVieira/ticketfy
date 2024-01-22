import { NextFunction, Request, Response } from 'express';
import { myContainer } from '../shared/container/inversify.container';
import { TYPES } from '../shared/types';
import { IUserPermissionServiceInterface } from '../services/interfaces/user-permission.service.interface';

export function can(permission: string) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const userPermissionService = myContainer.get<IUserPermissionServiceInterface>(TYPES.UserPermissionService);
    const { userId } = request;

    try {
      const userPermission = await userPermissionService.findByUserIdAndName(
        userId,
        permission
      );
      if (!userPermission) {
        return response.status(401).json({ message: 'Permission denied' });
      }
      return next();
    } catch (error) {
      return response.status(401).json({ message: 'Permission denied' });
    }
  };
}
