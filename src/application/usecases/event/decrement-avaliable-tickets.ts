import { IEventRepository } from "../../../domain/repositories/event/event.repository";

export class DecrementAvaliableTickets {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(eventId: string, quantity: number): Promise<void> {
    const event = await this.eventRepository.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    event.decrementAvailableTickets(quantity);
    await this.eventRepository.update(eventId, event);
  }
}
