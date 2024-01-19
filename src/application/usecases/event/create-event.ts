import { Event, EventProps } from '../../../domain/entities/events/event';
import { User } from '../../../domain/entities/users/user';
import { IEventRepository } from '../../../domain/repositories/events/event.repository';

export class CreateEvent {
  constructor(private readonly eventRepository: IEventRepository) { }

  async execute(user: User, input: EventProps): Promise<Event> {
    input.userId = user.getId();
    const event = Event.create(input);
    return this.eventRepository.create(event);
  }
}
