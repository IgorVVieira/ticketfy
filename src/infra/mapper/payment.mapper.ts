import { Payment } from "../../domain/entities/payment";
import { PaymentDB } from "../database/entities/payment";

export class PaymentMapper {
  static toDomain(paymentDB: PaymentDB): Payment {
    return Payment.create({
      id: paymentDB.id,
      eventId: paymentDB.eventId,
      userAccountId: paymentDB.userAccountId,
      value: paymentDB.value,
      type: paymentDB.paymentType,
    });
  }

  static toPersistence(payment: Payment): PaymentDB {
    const paymentDB = new PaymentDB();
    paymentDB.id = payment.getId();
    paymentDB.eventId = payment.eventId;
    paymentDB.userAccountId = payment.userAccountId;
    paymentDB.value = payment.getValue();
    paymentDB.paymentType = payment.type;
    return paymentDB;
  }
}
