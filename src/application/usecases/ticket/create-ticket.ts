import { ITicketRepository } from "../../../domain/repositories/ticket.repository";
import { Ticket, TicketProps } from "../../../domain/entities/ticket";
import { Event } from "../../../domain/entities/event/event";

export class CreateTicket {
  constructor(private readonly ticketRepository: ITicketRepository) {}

  async execute(
    input: TicketProps,
    quantity: number,
    event: Event
  ): Promise<void> {
    const avaliableTickets = event.hasAvailableTickets(quantity);
    if (!avaliableTickets) {
      throw new Error("Not enough tickets");
    }

    const tickets = [];
    for (let i = 0; i < quantity; i++) {
      const ticket = Ticket.create(input);
      tickets.push(ticket);
    }

    await this.ticketRepository.createMany(tickets);
  }
}
