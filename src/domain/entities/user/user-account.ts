import { Entity } from "../../../core/domain/Entity";
import { PaymentEnum } from "../payment-enum";

export type UserAccountProps = {
  user_id: string;
  name: string;
  amount: number;
  type: PaymentEnum;
  id?: string;
};

export class UserAccount extends Entity {
  private constructor(
    public readonly userId: string,
    public readonly name: string,
    private amount: number,
    public readonly type: PaymentEnum,
    id?: string
  ) {
    super(id);

    if (!this.isValidAmount(amount)) {
      throw new Error("Amount cannot be negative");
    }
  }

  static create({
    user_id: userId,
    name,
    amount,
    type,
    id,
  }: UserAccountProps): UserAccount {
    return new UserAccount(userId, name, amount, type, id);
  }

  private isValidAmount(amount: number): boolean {
    return amount >= 0;
  }

  public updateAmount(amount: number): void {
    if (!this.isValidAmount(amount)) {
      throw new Error("Amount cannot be negative");
    }
    this.amount = amount;
  }

  public getAmount(): number {
    return this.amount;
  }
}
