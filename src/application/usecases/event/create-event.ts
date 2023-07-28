import { Event, EventStatus } from "../../../domain/entities/event/event";
import { IEventRepository } from "../../../domain/repositories/event/event.repository";

type CreateEventProps = {
  event_owner_id: string;
  name: string;
  datetime: string;
  description: string;
  location: string;
  participants_limit: number;
  unitary_price: number;
  status: string;
};

export class CreateEvent {
  constructor(private readonly eventRepository: IEventRepository) {}

  async execute(input: CreateEventProps): Promise<Event> {
    const event = Event.create({
      ...input,
      status: EventStatus[input.status as keyof typeof EventStatus],
    });

    return this.eventRepository.create(event);
  }
}
