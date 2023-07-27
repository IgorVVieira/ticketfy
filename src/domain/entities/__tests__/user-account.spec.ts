import { PaymentEnum } from "../payment-enum";
import { UserAccount } from "../user-accounts";

describe("UserAccount", () => {
  it("should create a valid user account", () => {
    const userAccount = UserAccount.create({
      user_id: "1",
      amount: 10,
      name: "Igor",
      type: PaymentEnum.DEBIT,
    });

    expect(userAccount).toBeTruthy();
    expect(userAccount.props.user_id).toBe("1");
    expect(userAccount.props.amount).toBe(10);
    expect(userAccount.props.name).toBe("Igor");
    expect(userAccount.props.type).toBe(PaymentEnum.DEBIT);
  });

  it("should throw an error if amount is negative", () => {
    expect(() =>
      UserAccount.create({
        user_id: "1",
        amount: -10,
        name: "Igor",
        type: PaymentEnum.DEBIT,
      })
    ).toThrowError("Amount cannot be negative");
  });
});
