import { Entity } from "../../core/domain/Entity";
import { PaymentEnum } from "./payment-enum";

type UserAccountProps = {
  user_id: string;
  name: string;
  amount: number;
  type: PaymentEnum;
};

export class UserAccount extends Entity<UserAccountProps> {
  private constructor(props: UserAccountProps, id?: string) {
    super(props, id);

    if (!this.isValidAmount(props.amount)) {
      throw new Error("Amount cannot be negative");
    }
  }

  static create(props: UserAccountProps, id?: string): UserAccount {
    return new UserAccount(props, id);
  }

  private isValidAmount(amount: number): boolean {
    return amount >= 0;
  }
}
