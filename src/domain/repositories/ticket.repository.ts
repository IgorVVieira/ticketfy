import { Ticket } from "../entities/ticket";

export interface ITicketRepository {
  createMany(ticket: Ticket[]): Promise<Ticket[]>;
  getByConsumerId(consumer_id: string): Promise<Ticket[]>;
  getByEventId(event_id: string): Promise<Ticket[]>;
}
