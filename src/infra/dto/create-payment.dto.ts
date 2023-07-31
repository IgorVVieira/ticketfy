import { PaymentEnum } from "../../domain/entities/payment-enum";

export class CreatePaymentDto {
  readonly event_id: string;
  readonly user_account_id: string;
  readonly value: number;
  readonly type: PaymentEnum;
}
