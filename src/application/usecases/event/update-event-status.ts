import { Event, EventStatus } from "../../../domain/entities/events/event";
import { IEventRepository } from "../../../domain/repositories/events/event.repository";

export class UpdateEventStatus {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(event: Event, status: string): Promise<Event> {
    event.updateStatus(EventStatus[status as keyof typeof EventStatus]);
    return this.eventRepository.update(event.getId(), event);
  }
}
