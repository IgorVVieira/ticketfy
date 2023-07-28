import { PaymentEnum } from "../payment-enum";
import { ConsumerAccount } from "../consumer-accounts";

describe("ConsumerAccount", () => {
  it("should create a valid user account", () => {
    const consumerAccount = ConsumerAccount.create({
      consumer_id: "1",
      amount: 10,
      name: "Igor",
      type: PaymentEnum.DEBIT,
    });

    expect(consumerAccount).toBeTruthy();
    expect(consumerAccount.props.consumer_id).toBe("1");
    expect(consumerAccount.props.amount).toBe(10);
    expect(consumerAccount.props.name).toBe("Igor");
    expect(consumerAccount.props.type).toBe(PaymentEnum.DEBIT);
  });

  it("should throw an error if amount is negative", () => {
    expect(() =>
      ConsumerAccount.create({
        consumer_id: "1",
        amount: -10,
        name: "Igor",
        type: PaymentEnum.DEBIT,
      })
    ).toThrowError("Amount cannot be negative");
  });
});
