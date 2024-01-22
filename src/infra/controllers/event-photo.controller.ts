import { Request, Response } from 'express';
import { BaseHttpController, controller, httpPost, interfaces, requestParam, response } from 'inversify-express-utils';
import multer from 'multer';

import { EventPhotoService } from '../services/event-photo.service';
import { authMiddleware } from '../middlewares/auth.middleware';
import multerConfig from '../config/multer';
import { TYPES } from '../shared/types';
import { inject } from 'inversify';


@controller('/event-photos', authMiddleware)
export class EventPhotoController extends BaseHttpController implements interfaces.Controller {
  constructor(@inject(TYPES.EventPhotoService) private readonly eventPhotoService: EventPhotoService) {
    super();
  }

  @httpPost('/:id/photos', multer(multerConfig).array('file'))
  async create(@requestParam('id') id: string, req: Request, @response() res: Response) {
    try {
      const photos = req.files as Express.Multer.File[];
      const eventPhotos = await this.eventPhotoService.createMany(id, photos);
      return res.status(201).json(eventPhotos);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}
