import { Event, EventProps } from "../../../domain/entities/event/event";
import { User } from "../../../domain/entities/user";
import { IEventRepository } from "../../../domain/repositories/event/event.repository";

export class CreateEvent {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(user: User, input: EventProps): Promise<Event> {
    input.user_id = user.getId();
    const event = Event.create(input);
    return this.eventRepository.create(event);
  }
}
