import { Entity } from "../../core/domain/Entity";
import { PaymentEnum } from "./payment-enum";

export type PaymentProps = {
  eventId: string;
  userAccountId: string;
  value: number;
  type: PaymentEnum;
  id?: string;
};

export class Payment extends Entity {
  private constructor(
    public readonly eventId: string,
    public readonly userAccountId: string,
    private value: number,
    public readonly type: PaymentEnum,
    id?: string
  ) {
    super(id);

    if (!this.isValidValue(value)) {
      throw new Error("Value cannot be negative");
    }
  }

  static create({
    eventId,
    userAccountId,
    value,
    type,
    id,
  }: PaymentProps): Payment {
    return new Payment(eventId, userAccountId, value, type, id);
  }

  private isValidValue(value: number): boolean {
    return value >= 0;
  }

  public updateValue(value: number): void {
    if (!this.isValidValue(value)) {
      throw new Error("Value cannot be negative");
    }
    this.value = value;
  }

  public getValue(): number {
    return this.value;
  }
}
