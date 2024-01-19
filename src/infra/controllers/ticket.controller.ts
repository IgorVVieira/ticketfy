import { Request, Response } from 'express';
import { TicketService } from '../services/ticket.service';

export class TicketControler {
  constructor(private readonly ticketService: TicketService) {
    this.get = this.get.bind(this);
  }

  async get(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    const tickets = await this.ticketService.get(userId);
    return res.status(200).json(tickets);
  }
}
