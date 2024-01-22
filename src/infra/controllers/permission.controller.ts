import { Request, Response } from 'express';
import { BaseHttpController, controller, httpPost, interfaces, response } from 'inversify-express-utils';

import { PermissionService } from '../services/permission.service';
import { inject } from 'inversify';
import { TYPES } from '../shared/types';
import { authMiddleware } from '../middlewares/auth.middleware';

@controller('/permissions', authMiddleware)
export class PermissionController extends BaseHttpController implements interfaces.Controller {
  constructor(@inject(TYPES.PermissionService) private readonly permissionService: PermissionService) {
    super();
  }

  @httpPost('/')
  async create(req: Request, @response() res: Response): Promise<Response> {
    try {
      const { name, description } = req.body;
      const permission = await this.permissionService.create(name, description);
      return res.status(201).json(permission);
    } catch (error) {
      if (error.message === 'Permission already exists') {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
