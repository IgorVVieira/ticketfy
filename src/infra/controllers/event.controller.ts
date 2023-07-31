import { EventService } from "../services/event.service";
import { Request, Response } from "express";

export class EventController {
  constructor(private readonly eventService: EventService) {}

  async create(req: Request, res: Response): Promise<Response> {
    const event = await this.eventService.create(req.body);
    return res.status(201).json(event);
  }
}
