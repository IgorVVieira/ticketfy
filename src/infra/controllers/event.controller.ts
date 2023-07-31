import { EventService } from "../services/event.service";
import { Request, Response } from "express";

export class EventController {
  constructor(private readonly eventService: EventService) {
    this.create = this.create.bind(this);
    // this.findById = this.findById.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const event = await this.eventService.create(req.body);
    return res.status(201).json(event);
  }
}
