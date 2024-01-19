import { Entity } from '../../../core/domain/Entity';
import BusinessError from '../../../core/domain/business-error';
import { PaymentEnum } from '../payment-enum';

export type UserAccountProps = {
  userId: string;
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
      throw new BusinessError('Amount cannot be negative');
    }
  }

  static create(userAccountData: UserAccountProps): UserAccount {
    const { userId, name, amount, type, id } = userAccountData;
    return new UserAccount(userId, name, amount, type, id);
  }

  private isValidAmount(amount: number): boolean {
    return amount >= 0;
  }

  public updateAmount(amount: number): void {
    if (!this.isValidAmount(amount)) {
      throw new BusinessError('Amount cannot be negative');
    }
    this.amount = amount;
  }

  public decrementAmount(amount: number): void {
    if (!this.isValidAmount(amount)) {
      throw new BusinessError('Amount cannot be negative');
    }
    this.amount -= amount;
  }

  public getAmount(): number {
    return this.amount;
  }
}
