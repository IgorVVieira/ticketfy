import { Event } from '../../../domain/entities/events/event';
import { IEventRepository } from '../../../domain/repositories/events/event.repository';

export class DecrementAvaliableTickets {
  constructor(private readonly eventRepository: IEventRepository) { }

  async execute(event: Event, quantity: number): Promise<void> {
    event.decrementAvailableTickets(quantity);
    await this.eventRepository.update(event.getId(), event);
  }
}
