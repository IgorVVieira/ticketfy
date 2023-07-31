import { GetUserTickets } from "../../application/usecases/ticket/get-user-tickets";
import { Request, Response } from "express";

export class TicketControler {
  constructor(private readonly getUserTickets: GetUserTickets) {
    this.get = this.get.bind(this);
  }

  async get(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    const tickets = await this.getUserTickets.execute(userId);
    return res.status(200).json(tickets);
  }
}
