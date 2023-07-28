import { Entity } from "../../core/domain/Entity";
import { PaymentEnum } from "./payment-enum";

type ConsumerAccountProps = {
  consumer_id: string;
  name: string;
  amount: number;
  type: PaymentEnum;
};

export class ConsumerAccount extends Entity<ConsumerAccountProps> {
  private constructor(props: ConsumerAccountProps, id?: string) {
    super(props, id);

    if (!this.isValidAmount(props.amount)) {
      throw new Error("Amount cannot be negative");
    }
  }

  static create(props: ConsumerAccountProps, id?: string): ConsumerAccount {
    return new ConsumerAccount(props, id);
  }

  private isValidAmount(amount: number): boolean {
    return amount >= 0;
  }
}
