import { Event } from '../../../domain/entities/events/event';
import { IEventRepository } from '../../../domain/repositories/events/event.repository';

export class FindEvent {
  constructor(private readonly eventRepository: IEventRepository) { }

  async execute(id: string): Promise<Event | null> {
    return this.eventRepository.findById(id);
  }
}
