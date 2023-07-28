import { Event } from "../../domain/entities/event";
import {
  IEventRepository,
  findAllProps,
} from "../../domain/repositories/event.repository";

export class GetEvents {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(findAllProps?: findAllProps): Promise<Event[]> {
    return this.eventRepository.findAll(findAllProps);
  }
}
