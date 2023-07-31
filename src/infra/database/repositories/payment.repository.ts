import { Repository } from "typeorm";
import { IPaymentRepository } from "../../../domain/repositories/payment.repository";
import { PaymentDB } from "../entities/payment";
import { Payment } from "../../../domain/entities/payment";
import { PaymentMapper } from "../../mapper/payment.mapper";

export class PaymentRepository implements IPaymentRepository {
  constructor(private readonly repository: Repository<PaymentDB>) {}

  async create(entity: Payment): Promise<Payment> {
    const paymentDB = PaymentMapper.toPersistence(entity);
    const createdPayment = this.repository.create(paymentDB);
    await this.repository.save(createdPayment);
    return PaymentMapper.toDomain(createdPayment);
  }
}
