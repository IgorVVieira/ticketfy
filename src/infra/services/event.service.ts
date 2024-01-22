import { inject, injectable } from 'inversify';

import { CreateEvent } from '../../application/usecases/event/create-event';
import { DecrementAvaliableTickets } from '../../application/usecases/event/decrement-avaliable-tickets';
import { FindAllEvents } from '../../application/usecases/event/find-all-events';
import { FindEvent } from '../../application/usecases/event/find-event';
import BusinessError from '../../core/domain/business-error';
import { Event } from '../../domain/entities/events/event';
import { findAllProps } from '../../domain/repositories/events/event.repository';
import { CreateEventDto } from '../dto/create-event-dto';
import { IEventServiceInterface } from './interfaces/event.service.interface';
import { UserService } from './user.service';
import { TYPES } from '../shared/types';

@injectable()
export class EventService implements IEventServiceInterface {
  constructor(
    private readonly createEvent: CreateEvent,
    private readonly findEvent: FindEvent,
    private readonly decrementAvaliableTickets: DecrementAvaliableTickets,
    private readonly findAllEvents: FindAllEvents,
    @inject(TYPES.UserService) private readonly userService: UserService
  ) {
  }

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const user = await this.userService.findById('id', createEventDto.userId);
    return this.createEvent.execute(user, createEventDto);
  }

  async findById(id: string): Promise<Event | null> {
    return this.findEvent.execute(id);
  }

  async decrementAvailableTickets(id: string, quantity: number): Promise<void> {
    const event = await this.findEvent.execute(id);
    if (!event) throw new BusinessError('Event not found');
    return this.decrementAvaliableTickets.execute(event, quantity);
  }

  async findAll(findAllProps?: findAllProps): Promise<Event[]> {
    return this.findAllEvents.execute(findAllProps);
  }
}
