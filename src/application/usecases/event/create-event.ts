import { Event, EventProps } from "../../../domain/entities/event/event";
import { EventOwner } from "../../../domain/entities/event/event-owners";
import { IEventRepository } from "../../../domain/repositories/event/event.repository";

export class CreateEvent {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(eventOwner: EventOwner, input: EventProps): Promise<Event> {
    input.event_owner_id = eventOwner.getId();
    const event = Event.create(input);
    return this.eventRepository.create(event);
  }
}
