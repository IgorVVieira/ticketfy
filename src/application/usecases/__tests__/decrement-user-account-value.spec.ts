import { PaymentEnum } from "../../../domain/entities/payment-enum";
import { UserAccount } from "../../../domain/entities/users/user-account";
import { IUserAccountRepository } from "../../../domain/repositories/users/user-account.repository";
import { DecrementUserAccountValue } from "../user/decrement-user-account-value";

const mockUserAccountRepository: IUserAccountRepository = {
  findByUserId: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe("DecrementUserAccountValue", () => {
  let decrementUserAccountValue: DecrementUserAccountValue;

  beforeEach(() => {
    decrementUserAccountValue = new DecrementUserAccountValue(
      mockUserAccountRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should decrement the amount of an existing user account", async () => {
    const existingUserAccount = UserAccount.create({
      userId: "user123",
      name: "Sample User Account",
      amount: 100,
      type: PaymentEnum.CREDIT,
    });

    (mockUserAccountRepository.findById as jest.Mock).mockResolvedValueOnce(
      existingUserAccount
    );

    const decrementValue = 50;
    existingUserAccount.decrementAmount(decrementValue);

    (mockUserAccountRepository.update as jest.Mock).mockResolvedValueOnce(
      existingUserAccount
    );

    const userAccountId = existingUserAccount.getId();
    const userAccount = await decrementUserAccountValue.execute(
      existingUserAccount,
      decrementValue
    );

    expect(mockUserAccountRepository.update).toHaveBeenCalledWith(
      userAccountId,
      existingUserAccount
    );

    expect(userAccount).toEqual(existingUserAccount);
  });
});
