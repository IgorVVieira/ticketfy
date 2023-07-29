import { Entity } from "../../../core/domain/Entity";

export enum EventStatus {
  CANCELED = "CANCELED",
  FINISHED = "FINISHED",
  OPEN = "OPEN",
  SOLD_OUT = "SOLD_OUT",
}

export type EventProps = {
  event_owner_id: string;
  name: string;
  datetime: string;
  description: string;
  location: string;
  participants_limit: number;
  unitary_price: number;
  status: EventStatus;
  available_tickets: number;
};

export class Event extends Entity<EventProps> {
  private constructor(props: EventProps, id?: string) {
    super(props, id);
  }

  static create(props: EventProps, id?: string): Event {
    return new Event(props, id);
  }

  hasAvailableTickets(quantity?: number): boolean {
    return (
      this.props.available_tickets > 0 &&
      this.props.status === EventStatus.OPEN &&
      this.props.participants_limit >= quantity!
    );
  }

  decrementAvailableTickets(quantity: number): void {
    if (!this.hasAvailableTickets(quantity)) {
      return;
    }
    this.props.available_tickets -= quantity;
  }
}
