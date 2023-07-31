import { CreateEvent } from "../../application/usecases/event/create-event";
import { DecrementAvaliableTickets } from "../../application/usecases/event/decrement-avaliable-tickets";
import { FindEvent } from "../../application/usecases/event/find-event";
import { Event } from "../../domain/entities/event/event";
import { CreateEventDto } from "../dto/create-event-dto";
import { UserService } from "./user.service";

export class EventService {
  constructor(
    private readonly createEvent: CreateEvent,
    private readonly findEvent: FindEvent,
    private readonly decrementAvaliableTickets: DecrementAvaliableTickets,
    private readonly userService: UserService
  ) {
    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);
    this.decrementAvailableTickets = this.decrementAvailableTickets.bind(this);
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const user = await this.userService.findById(createEventDto.user_id);
    return this.createEvent.execute(user, createEventDto);
  }

  async findById(id: string): Promise<Event | null> {
    return this.findEvent.execute(id);
  }

  async decrementAvailableTickets(id: string, quantity: number): Promise<void> {
    const event = await this.findEvent.execute(id);
    if (!event) throw new Error("Event not found");
    return this.decrementAvaliableTickets.execute(event, quantity);
  }
}
