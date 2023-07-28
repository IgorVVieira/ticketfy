import { Entity } from "../../core/domain/Entity";

export enum EventStatus {
  CANCELED = "CANCELED",
  FINISHED = "FINISHED",
  OPEN = "OPEN",
  SOLD_OUT = "SOLD_OUT",
}

type EventProps = {
  event_owner_id: string;
  name: string;
  datetime: string;
  description: string;
  location: string;
  participants_limit: number;
  unitary_price: number;
  status: EventStatus;
};

export class Event extends Entity<EventProps> {
  private constructor(props: EventProps, id?: string) {
    super(props, id);
  }

  static create(props: EventProps, id?: string): Event {
    return new Event(props, id);
  }
}
