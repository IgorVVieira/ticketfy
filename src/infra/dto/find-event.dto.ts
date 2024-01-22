import { PaymentEnum } from '../../domain/entities/payment-enum';

export class FindEventDTO {
  readonly eventId: string;
  readonly userAccountId: string;
  readonly type: PaymentEnum;
  readonly quantity: number;
}
