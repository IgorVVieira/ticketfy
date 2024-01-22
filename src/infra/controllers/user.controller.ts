import { Request, Response } from 'express';
import { interfaces, controller, httpPost, httpPatch, httpGet, response, requestBody, queryParam, BaseHttpController } from 'inversify-express-utils';
import { inject } from 'inversify';
import multer from 'multer';

import { UserService } from '../services/user.service';
import { TYPES } from '../shared/types';
import { authMiddleware } from '../middlewares/auth.middleware';
import multerConfig from '../config/multer';
import { CreateUserDto } from '../dto/create-user.dto';

@controller('/users')
export class UserController extends BaseHttpController implements interfaces.Controller {
  constructor(@inject(TYPES.UserService) private readonly userService: UserService) {
    super();
  }

  @httpPost('/')
  async create(@requestBody() userDTO: CreateUserDto, @response() res: Response): Promise<Response> {
    try {
      const user = await this.userService.create(userDTO);
      return res.status(201).json(user);
    } catch (error) {
      if (error.message === 'Email already in use') {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  @httpPatch('/:id/picture', multer(multerConfig).single('file'), authMiddleware)
  async update(@queryParam('id') id: string, req: Request, @response() res: Response): Promise<Response> {
    const location = req?.file?.location;
    const user = await this.userService.update(id, location as string);
    return res.status(200).json(user);
  }

  @httpGet('/:id', authMiddleware)
  async findById(@queryParam('id') id: string, @response() res: Response): Promise<Response> {
    try {
      const user = await this.userService.findById('id', id);
      return res.status(200).json(user);
    } catch (error) {
      if (error.message === 'User not found') {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
