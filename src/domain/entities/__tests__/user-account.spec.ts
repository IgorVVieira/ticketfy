import { PaymentEnum } from "../payment-enum";
import { UserAccount } from "../user/user-account";

describe("UserAccount", () => {
  const userAccount = UserAccount.create({
    user_id: "1",
    name: "Igor",
    amount: 10,
    type: PaymentEnum.DEBIT,
  });
  it("should create a valid user account", () => {
    expect(userAccount).toBeTruthy();
    expect(userAccount.userId).toBe("1");
    expect(userAccount.getAmount()).toBe(10);
    expect(userAccount.name).toBe("Igor");
    expect(userAccount.type).toBe(PaymentEnum.DEBIT);
  });

  it("should throw an error if amount is negative", () => {
    expect(() => userAccount.updateAmount(-10)).toThrowError(
      "Amount cannot be negative"
    );
  });

  it("should update amount", () => {
    userAccount.updateAmount(20);
    expect(userAccount.getAmount()).toBe(20);
  });

  it("should throw an error if amount is negative", () => {
    expect(() =>
      UserAccount.create({
        user_id: "1",
        name: "Igor",
        amount: -10,
        type: PaymentEnum.DEBIT,
      })
    ).toThrowError("Amount cannot be negative");
  });
});
