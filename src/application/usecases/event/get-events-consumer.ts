import { Event } from "../../../domain/entities/events/event";
import {
  IEventRepository,
  findAllProps,
} from "../../../domain/repositories/events/event.repository";

export class GetEventsConsumer {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(findAllProps?: findAllProps): Promise<Event[]> {
    return this.eventRepository.findAll(findAllProps);
  }
}
