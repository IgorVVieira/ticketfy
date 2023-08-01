import { CreatePayment } from "../../application/usecases/payment/create-payment";
import { Payment } from "../../domain/entities/payment";
import { CreatePaymentDto } from "../dto/create-payment.dto";
import { EventService } from "./event.service";
import { TicketService } from "./ticket.service";
import { UserAccountService } from "./user-account.service";
import { UserService } from "./user.service";

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
    const user = await this.userService.findById("id", userId);

    if (!user) throw new Error("User not found");

    const event = await this.eventService.findById(createPaymentDto.event_id);
    if (!event) throw new Error("Event not found");

    const userAccount = await this.userAccountService.find(
      createPaymentDto.user_account_id,
      userId
    );
    if (!userAccount) throw new Error("User account not found");

    const payment = await this.createPayment.execute(
      createPaymentDto,
      event,
      quantity
    );

    await this.userAccountService.decrementValue(
      userAccount,
      payment.getValue()
    );

    await this.ticketService.create(
      { event_id: event.getId(), user_id: userId, payment_id: payment.getId() },
      quantity
    );

    this.eventService.decrementAvailableTickets(event.getId(), quantity);

    return payment;
  }
}
