import { Ticket } from '../../domain/entities/ticket';
import { TicketDB } from '../database/entities/ticket';

export class TicketMapper {
  static toDomain(ticketDB: TicketDB): Ticket {
    return Ticket.create({
      id: ticketDB.id,
      eventId: ticketDB.eventId,
      userId: ticketDB.userId,
      paymentId: ticketDB.paymentId
    });
  }

  static toPersistence(ticket: Ticket): TicketDB {
    const ticketDB = new TicketDB();
    ticketDB.id = ticket.getId();
    ticketDB.eventId = ticket.eventId;
    ticketDB.userId = ticket.userId;
    ticketDB.paymentId = ticket.paymentId;
    return ticketDB;
  }
}
