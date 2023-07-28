import { Entity } from "../../core/domain/Entity";
import { PaymentEnum } from "./payment-enum";

export type PaymentProps = {
  event_id: string;
  user_account_id: string;
  value: number;
  type: PaymentEnum;
};

export class Payment extends Entity<PaymentProps> {
  private constructor(props: PaymentProps, id?: string) {
    super(props, id);

    if (!this.isValidValue(props.value)) {
      throw new Error("Value cannot be negative");
    }
  }

  static create(props: PaymentProps, id?: string): Payment {
    return new Payment(props, id);
  }

  private isValidValue(value: number): boolean {
    return value >= 0;
  }
}
