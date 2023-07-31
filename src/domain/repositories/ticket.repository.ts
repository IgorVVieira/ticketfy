import { Ticket } from "../entities/ticket";

export interface ITicketRepository {
  createMany(ticket: Ticket[]): Promise<void>;
  getByUserId(userId: string): Promise<Ticket[]>;
  getByEventId(eventId: string): Promise<Ticket[]>;
}
