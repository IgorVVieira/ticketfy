import { ITicketRepository } from "../../../domain/repositories/ticket.repository";
import { Ticket, TicketProps } from "../../../domain/entities/ticket";

export class CreateTicket {
  constructor(private readonly ticketRepository: ITicketRepository) {}

  async execute(input: TicketProps, quantity: number): Promise<void> {
    const tickets = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = Ticket.create(input);
      tickets.push(ticket);
    }

    await this.ticketRepository.createMany(tickets);
  }
}
