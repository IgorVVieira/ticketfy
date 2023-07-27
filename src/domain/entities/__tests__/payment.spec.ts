import { Payment } from "../payment";
import { PaymentEnum } from "../payment-enum";

describe("Payment", () => {
  it("should create a valid payment", () => {
    const payment = Payment.create({
      event_id: "1",
      user_account_id: "1",
      value: 10,
      type: PaymentEnum.CREDIT,
    });

    expect(payment).toBeTruthy();

    expect(payment.props.event_id).toBe("1");
    expect(payment.props.user_account_id).toBe("1");
    expect(payment.props.value).toBe(10);
    expect(payment.props.type).toBe(PaymentEnum.CREDIT);
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
