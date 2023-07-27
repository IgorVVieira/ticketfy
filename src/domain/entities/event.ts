import { Entity } from "../../core/domain/Entity";

type EventProps = {
  event_owner_id: string;
  name: string;
  datetime: string;
  description: string;
  location: string;
  participants_limit: number;
  unitary_price: number;
};

export class Event extends Entity<EventProps> {
  private constructor(props: EventProps, id?: string) {
    super(props, id);
  }

  static create(props: EventProps, id?: string): Event {
    return new Event(props, id);
  }
}
