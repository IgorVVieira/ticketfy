import { PaymentEnum } from "../../domain/entities/payment-enum";

export class CreatePaymentDto {
  readonly eventId: string;
  readonly userAccountId: string;
  readonly value: number;
  readonly type: PaymentEnum;
}
