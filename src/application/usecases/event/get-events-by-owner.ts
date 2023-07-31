import { Event } from "../../../domain/entities/events/event";
import { IEventRepository } from "../../../domain/repositories/events/event.repository";

export class GetEventsByOwner {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(ownerId: string): Promise<Event[]> {
    return this.eventRepository.findByOwner(ownerId);
  }
}
