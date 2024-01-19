import BusinessError from '../../../core/domain/business-error';
import { Event } from '../../../domain/entities/events/event';
import { Payment, PaymentProps } from '../../../domain/entities/payment';
import { IPaymentRepository } from '../../../domain/repositories/payment.repository';

export class CreatePayment {
  constructor(private readonly paymentRepository: IPaymentRepository) { }

  async execute(
    input: PaymentProps,
    event: Event,
    quantity: number
  ): Promise<Payment> {
    const avaliableTickets = event.hasAvailableTickets(quantity);
    if (!avaliableTickets) {
      throw new BusinessError('Not enough tickets avaliable');
    }
    input.eventId = event.getId();
    const payment = Payment.create(input);

    return this.paymentRepository.create(payment);
  }
}
