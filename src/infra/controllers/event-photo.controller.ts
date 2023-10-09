import { EventPhotoService } from "../services/event-photo.service";
import { Request, Response } from "express";

export class EventPhotoController {
  constructor(private readonly eventPhotoService: EventPhotoService) {
    this.create = this.create.bind(this);
  }
  
  async create(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const photos = req.files as Express.Multer.File[];
      const eventPhotos = await this.eventPhotoService.execute(id, photos);
      return res.status(201).json(eventPhotos);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
