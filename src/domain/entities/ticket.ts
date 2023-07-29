import { Entity } from "../../core/domain/Entity";

export type TicketProps = {
  eventId: string;
  consumerId: string;
  paymentId: string;
  id?: string;
};

export class Ticket extends Entity {
  private constructor(
    public readonly eventId: string,
    public readonly consumerId: string,
    public readonly paymentId: string,
    id?: string
  ) {
    super(id);
  }

  static create({ eventId, consumerId, paymentId, id }: TicketProps): Ticket {
    return new Ticket(eventId, consumerId, paymentId, id);
  }
}
