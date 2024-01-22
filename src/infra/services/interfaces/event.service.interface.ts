import { Event } from '../../../domain/entities/events/event';
import { findAllProps } from '../../../domain/repositories/events/event.repository';
import { CreateEventDto } from '../../dto/create-event-dto';

export interface IEventServiceInterface {
  create(createEventDto: CreateEventDto): Promise<Event>;
  findById(id: string): Promise<Event | null>;
  decrementAvailableTickets(id: string, quantity: number): Promise<void>;
  findAll(findAllProps?: findAllProps): Promise<Event[]>;
}
