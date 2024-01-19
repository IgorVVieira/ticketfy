import { Entity } from '../../../core/domain/Entity';
import BusinessError from '../../../core/domain/business-error';

export enum EventStatus {
  CANCELED = 'CANCELED',
  FINISHED = 'FINISHED',
  OPEN = 'OPEN',
  SOLD_OUT = 'SOLD_OUT',
}

export type EventProps = {
  userId: string;
  name: string;
  datetime: string;
  location: string;
  participants_limit: number;
  unitary_price: number;
  avaliable_tickets: number;
  description?: string;
  status?: EventStatus;
  id?: string;
  photos?: string[];
};

export class Event extends Entity {
  private constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly datetime: string,
    public readonly location: string,
    public readonly participantsLimit: number,
    public readonly unitaryPrice: number,
    private status: EventStatus = EventStatus.OPEN,
    public avaliableTickets: number,
    public readonly description?: string,
    id?: string,
    public readonly photos?: string[]
  ) {
    super(id);
  }

  static create(eventData: EventProps): Event {
    const {
      userId,
      name,
      datetime,
      location,
      participants_limit: participantsLimit,
      unitary_price: unitaryPrice,
      status,
      avaliable_tickets: avaliableTickets,
      description,
      id,
      photos
    } = eventData;
    return new Event(
      userId,
      name,
      datetime,
      location,
      participantsLimit,
      unitaryPrice,
      status,
      avaliableTickets,
      description,
      id,
      photos
    );
  }

  hasAvailableTickets(quantity?: number): boolean {
    return Boolean(
      this.avaliableTickets >= quantity! &&
      this.status === EventStatus.OPEN &&
      this.participantsLimit >= quantity!
    );
  }

  decrementAvailableTickets(quantity: number): void {
    if (!this.hasAvailableTickets(quantity)) {
      throw new BusinessError('Event has no available tickets');
    }
    this.avaliableTickets -= quantity;
  }

  getStatus(): EventStatus {
    return this.status.toString() as EventStatus;
  }

  updateStatus(status: EventStatus): void {
    this.status = status;
  }
}
