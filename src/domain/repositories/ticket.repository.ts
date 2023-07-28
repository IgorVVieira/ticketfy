import { Ticket } from "../entities/ticket";
import { IGenericCreateRepository } from "./generic-create.repository";

export interface ITicketRepository extends IGenericCreateRepository<Ticket> {
  getByConsumerId(consumer_id: string): Promise<Ticket[]>;
  getByEventId(event_id: string): Promise<Ticket[]>;
}
