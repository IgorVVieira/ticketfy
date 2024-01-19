import { CreatePayment } from '../../application/usecases/payment/create-payment';
import BusinessError from '../../core/domain/business-error';
import { Payment } from '../../domain/entities/payment';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { EventService } from './event.service';
import { TicketService } from './ticket.service';
import { UserAccountService } from './user-account.service';
import { UserService } from './user.service';

export class PaymentService {
  constructor(
    private readonly createPayment: CreatePayment,
    private readonly userService: UserService,
    private readonly userAccountService: UserAccountService,
    private readonly eventService: EventService,
    private readonly ticketService: TicketService
  ) {
    this.create = this.create.bind(this);
  }

  async create(
    userId: string,
    createPaymentDto: CreatePaymentDto,
    quantity: number
  ): Promise<Payment | null> {
    const user = await this.userService.findById('id', userId);

    if (!user) throw new BusinessError('User not found');

    const event = await this.eventService.findById(createPaymentDto.eventId);
    if (!event) throw new BusinessError('Event not found');

    const userAccount = await this.userAccountService.find(
      createPaymentDto.userAccountId
    );
    if (!userAccount) throw new BusinessError('User account not found');

    const eventId = event.getId();

    const payment = await this.createPayment.execute(
      createPaymentDto,
      event,
      quantity
    );

    await Promise.all([
      this.userAccountService.decrementValue(
        userAccount,
        payment.getValue() * quantity
      ),
      this.ticketService.create(
        { eventId: eventId, userId: userId, paymentId: payment.getId() },
        quantity
      ),
      this.eventService.decrementAvailableTickets(eventId, quantity)
    ]);

    return payment;
  }
}
