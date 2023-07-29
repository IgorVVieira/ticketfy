import { Event } from "../../../domain/entities/event/event";
import { IEventRepository } from "../../../domain/repositories/event/event.repository";

export class GetEventsByOwner {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(ownerId: string): Promise<Event[]> {
    return this.eventRepository.findByOwner(ownerId);
  }
}
