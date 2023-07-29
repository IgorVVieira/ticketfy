import {
  EventOwner,
  EventOwnerType,
} from "../../../domain/entities/event/event-owner";
import { IEventOwnerRepository } from "../../../domain/repositories/event/event-owner.repository";
import { UserProps } from "../../../domain/entities/user";

export class CreateEventOwner {
  constructor(private readonly eventOwnerRepository: IEventOwnerRepository) {}

  async execute(input: UserProps, type: EventOwnerType): Promise<EventOwner> {
    const eventOwner = EventOwner.create(input, type);
    return this.eventOwnerRepository.create(eventOwner);
  }
}
