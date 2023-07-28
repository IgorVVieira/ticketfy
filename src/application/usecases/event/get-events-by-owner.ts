import { IEventRepository } from "../../../domain/repositories/event/event.repository";

export class GetEventsByOwner {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(ownerId: string) {
    return this.eventRepository.findByOwner(ownerId);
  }
}
