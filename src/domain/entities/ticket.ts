import { Entity } from "../../core/domain/Entity";

export type TicketProps = {
  event_id: string;
  user_id: string;
  payment_id: string;
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

  static create({
    event_id: eventId,
    user_id: userId,
    payment_id: paymentId,
    id,
  }: TicketProps): Ticket {
    return new Ticket(eventId, userId, paymentId, id);
  }
}
