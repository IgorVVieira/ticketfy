import { ITicketRepository } from "../../../domain/repositories/ticket.repository";

export class GetConsumerTickets {
  constructor(private readonly ticketRepository: ITicketRepository) {}

  async execute(consumerId: string) {
    return this.ticketRepository.getByConsumerId(consumerId);
  }
}
