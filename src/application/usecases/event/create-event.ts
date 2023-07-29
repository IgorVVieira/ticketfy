import {
  Event,
  EventProps,
  EventStatus,
} from "../../../domain/entities/event/event";
import { IEventRepository } from "../../../domain/repositories/event/event.repository";

export class CreateEvent {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(input: EventProps): Promise<Event> {
    const event = Event.create(input);
    return this.eventRepository.create(event);
  }
}
