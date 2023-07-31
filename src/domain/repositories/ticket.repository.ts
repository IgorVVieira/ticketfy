import { Ticket } from "../entities/ticket";

export interface ITicketRepository {
  createMany(ticket: Ticket[]): Promise<Ticket[]>;
  getByUserId(consumer_id: string): Promise<Ticket[]>;
  getByEventId(event_id: string): Promise<Ticket[]>;
}
