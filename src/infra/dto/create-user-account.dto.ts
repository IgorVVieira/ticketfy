import { PaymentEnum } from '../../domain/entities/payment-enum';

export class CreateUserAccountDto {
  readonly userId: string;
  readonly name: string;
  readonly amount: number;
  readonly type: PaymentEnum;
}
