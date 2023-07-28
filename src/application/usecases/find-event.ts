import { Event } from "../../domain/entities/event";
import { IEventRepository } from "../../domain/repositories/event.repository";

export class FindEvent {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(id: string): Promise<Event | null> {
    return this.eventRepository.findById(id);
  }
}
