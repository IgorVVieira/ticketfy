import { Repository } from "typeorm";
import { ITicketRepository } from "../../../domain/repositories/ticket.repository";
import { TicketDB } from "../entities/ticket";
import { Ticket } from "../../../domain/entities/ticket";
import { TicketMapper } from "../../mapper/ticket.mapper";

export class TicketRepository implements ITicketRepository {
  constructor(private readonly repository: Repository<TicketDB>) {}

  async createMany(ticket: Ticket[]): Promise<void> {
    const ticketsDB = ticket.map((ticket) =>
      TicketMapper.toPersistence(ticket)
    );
    const createdTickets = this.repository.create(ticketsDB);
    await this.repository.save(createdTickets);
  }

  async getByUserId(userId: string): Promise<Ticket[]> {
    const ticketsDB = await this.repository.find({
      where: { user_id: userId },
    });
    return ticketsDB.map((ticketDB) => TicketMapper.toDomain(ticketDB));
  }

  async getByEventId(eventId: string): Promise<Ticket[]> {
    const ticketsDB = await this.repository.find({
      where: { event_id: eventId },
    });
    return ticketsDB.map((ticketDB) => TicketMapper.toDomain(ticketDB));
  }
}
