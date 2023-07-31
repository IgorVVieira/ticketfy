import { Payment } from "../payment";
import { PaymentEnum } from "../payment-enum";

describe("Payment", () => {
  const payment = Payment.create({
    event_id: "1",
    user_account_id: "1",
    value: 10,
    type: PaymentEnum.CREDIT,
  });
  it("should create a valid payment", () => {
    expect(payment).toBeTruthy();

    expect(payment.eventId).toBe("1");
    expect(payment.userAccountId).toBe("1");
    expect(payment.getValue()).toBe(10);
    expect(payment.type).toBe(PaymentEnum.CREDIT);
  });

  it("should throw an error if value is negative", () => {
    expect(() => payment.updateValue(-10)).toThrowError(
      "Value cannot be negative"
    );
  });

  it("should update value", () => {
    payment.updateValue(20);
    expect(payment.getValue()).toBe(20);
  });

  it("should throw an error if value is negative", () => {
    expect(() =>
      Payment.create({
        event_id: "1",
        user_account_id: "1",
        value: -10,
        type: PaymentEnum.CREDIT,
      })
    ).toThrowError("Value cannot be negative");
  });
});
