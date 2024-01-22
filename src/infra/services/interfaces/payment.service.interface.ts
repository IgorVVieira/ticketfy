import { Payment } from '../../../domain/entities/payment';
import { CreatePaymentDto } from '../../dto/create-payment.dto';

export interface IPaymentServiceInterface {
  create(
    userId: string,
    createPaymentDto: CreatePaymentDto,
    quantity: number
  ): Promise<Payment | null>;
}
