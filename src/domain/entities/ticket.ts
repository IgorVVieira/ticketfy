import { Entity } from "../../core/domain/Entity";

type TicketProps = {
  event_id: string;
  consumer_id: string;
  payment_id: string;
};

export class Ticket extends Entity<TicketProps> {
  private constructor(props: TicketProps, id?: string) {
    super(props, id);
  }

  static create(props: TicketProps, id?: string): Ticket {
    return new Ticket(props, id);
  }
}
