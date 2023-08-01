import { Entity } from "../../core/domain/Entity";

export type TicketProps = {
  eventId: string;
  userId: string;
  paymentId: string;
  id?: string;
};

export class Ticket extends Entity {
  private constructor(
    public readonly eventId: string,
    public readonly userId: string,
    public readonly paymentId: string,
    id?: string
  ) {
    super(id);
  }

  static create({ eventId, userId, paymentId, id }: TicketProps): Ticket {
    return new Ticket(eventId, userId, paymentId, id);
  }
}
