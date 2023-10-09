import { findAllProps } from "../../domain/repositories/events/event.repository";
import { EventService } from "../services/event.service";
import { Request, Response } from "express";

export class EventController {
  constructor(private readonly eventService: EventService) {
    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const event = await this.eventService.create(req.body);
      return res.status(201).json(event);
    } catch (error: any) {
      if (error.message === "User not found") {
        return res.status(404).json({ error: error.message });
      }
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

  async findAll(req: Request, res: Response): Promise<Response> {
    const { name, type, datetime, status } = req.query as findAllProps;
    const events = await this.eventService.findAll({
      name,
      type,
      datetime,
      status,
    });
    return res.status(200).json(events);
  }
}
