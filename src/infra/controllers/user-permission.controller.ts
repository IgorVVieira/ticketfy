import { Response } from 'express';
import { BaseHttpController, controller, httpPost, interfaces, requestBody, response } from 'inversify-express-utils';
import { UserPermissionService } from '../services/user-permission.service';

import { TYPES } from '../shared/types';
import { inject } from 'inversify';
import { authMiddleware } from '../middlewares/auth.middleware';

@controller('/user-permissions', authMiddleware)
export class UserPermissionController extends BaseHttpController implements interfaces.Controller {
  constructor(@inject(TYPES.UserPermissionService) private readonly userPermissionService: UserPermissionService) {
    super();
  }

  @httpPost('/')
  async create(@requestBody() body: { userId: string, permissionId: string }, @response() res: Response): Promise<Response> {
    try {
      const { userId, permissionId } = body;
      const userPermission = await this.userPermissionService.create(
        userId,
        permissionId
      );
      return res.status(201).json(userPermission);
    } catch (error) {
      if (error.message === 'User permission already exists') {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
