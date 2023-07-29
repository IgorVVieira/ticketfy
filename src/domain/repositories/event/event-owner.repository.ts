import { EventOwner } from "../../entities/event/event-owners";
import { IGenericCreateRepository } from "../generic-create.repository";

export interface IEventOwnerRepository
  extends IGenericCreateRepository<EventOwner> {}