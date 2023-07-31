import { PaymentEnum } from "../../domain/entities/payment-enum";

export class CreateUserAccountDto {
  readonly user_id: string;
  readonly name: string;
  readonly amount: number;
  readonly type: PaymentEnum;
}
