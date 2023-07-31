import { Ticket } from "../../domain/entities/ticket";
import { TicketDB } from "../database/entities/ticket";

export class TicketMapper {
  static toDomain(ticketDB: TicketDB): Ticket {
    return Ticket.create({
      id: ticketDB.id,
      eventId: ticketDB.event_id,
      userId: ticketDB.user_id,
      paymentId: ticketDB.payment_id,
    });
  }

  static toPersistence(ticket: Ticket): TicketDB {
    const ticketDB = new TicketDB();
    ticketDB.id = ticket.getId();
    ticketDB.event_id = ticket.eventId;
    ticketDB.user_id = ticket.userId;
    ticketDB.payment_id = ticket.paymentId;
    return ticketDB;
  }
}
