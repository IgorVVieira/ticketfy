import { EventOwner } from "../../entities/event/event-owner";
import { IGenericCreateRepository } from "../generic-create.repository";

export interface IEventOwnerRepository
  extends IGenericCreateRepository<EventOwner> {}
