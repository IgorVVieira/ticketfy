import { Payment } from "../../domain/entities/payment";
import { PaymentDB } from "../database/entities/payment";

export class PaymentMapper {
  static toDomain(paymentDB: PaymentDB): Payment {
    return Payment.create({
      id: paymentDB.id,
      eventId: paymentDB.event_id,
      userAccountId: paymentDB.user_account_id,
      value: paymentDB.value,
      type: paymentDB.paymentType,
    });
  }

  static toPersistence(payment: Payment): PaymentDB {
    const paymentDB = new PaymentDB();
    paymentDB.id = payment.getId();
    paymentDB.event_id = payment.eventId;
    paymentDB.user_account_id = payment.userAccountId;
    paymentDB.value = payment.getValue();
    paymentDB.paymentType = payment.type;
    return paymentDB;
  }
}
