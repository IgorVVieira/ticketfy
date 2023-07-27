import { Event } from "../entities/event";
import { IGenericCreateRepository } from "./generic-create.repository";

export interface IEventRepository extends IGenericCreateRepository<Event> {
  list(type?: string, date?: string): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
}
