import { ITicketRepository } from '../../../domain/repositories/ticket.repository';

export class GetUserTickets {
  constructor(private readonly ticketRepository: ITicketRepository) { }

  async execute(userId: string) {
    return this.ticketRepository.getByUserId(userId);
  }
}
