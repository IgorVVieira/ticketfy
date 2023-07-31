import { EventService } from "../services/event.service";
import { Request, Response } from "express";

export class EventController {
  constructor(private readonly eventService: EventService) {
    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const event = await this.eventService.create(req.body);
      return res.status(201).json(event);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const event = await this.eventService.findById(req.params.id);
      return res.status(200).json(event);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
