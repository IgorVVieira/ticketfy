import { Event } from "../../entities/event/event";
import { IGenericCreateRepository } from "../generic-create.repository";

export type findAllProps = {
  name?: string;
  type?: string;
  datetime?: string;
  status?: string;
};

export interface IEventRepository extends IGenericCreateRepository<Event> {
  findAll(props?: findAllProps): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
}
