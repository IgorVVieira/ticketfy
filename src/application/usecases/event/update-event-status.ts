import { Event, EventStatus } from "../../../domain/entities/event/event";
import { IEventRepository } from "../../../domain/repositories/event/event.repository";

export class UpdateEventStatus {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(id: string, status: string): Promise<Event> {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      throw new Error("Event not found");
    }

    event.props.status = EventStatus[status as keyof typeof EventStatus];
    return this.eventRepository.update(event.getId(), event);
  }
}
