import { IUserAccountRepository } from "../../../domain/repositories/users/user-account.repository";
import { User } from "../../../domain/entities/users/user";
import { CreateUserAccount } from "../user/create-user-account";
import { PaymentEnum } from "../../../domain/entities/payment-enum";
import { UserAccount } from "../../../domain/entities/users/user-account";

// Mock the user account repository
const mockUserAccountRepository: IUserAccountRepository = {
  create: jest.fn(),
  findByUserId: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
};

describe("CreateUserAccount", () => {
  let createUserAccount: CreateUserAccount;

  beforeEach(() => {
    createUserAccount = new CreateUserAccount(mockUserAccountRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user account successfully", async () => {
    const user = User.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "SecurePassword123",
    });

    const userInput = {
      id: "1",
      userId: user.getId(),
      name: "Savings Account",
      amount: 1000,
      type: PaymentEnum.CREDIT,
    };

    const mockCreatedUserAccount = UserAccount.create({
      ...userInput,
    });

    (mockUserAccountRepository.create as jest.Mock).mockResolvedValueOnce(
      mockCreatedUserAccount
    );

    const userAccount = await createUserAccount.execute(user, userInput);

    expect(mockUserAccountRepository.create).toHaveBeenCalledWith(
      mockCreatedUserAccount
    );

    expect(userAccount).toEqual(mockCreatedUserAccount);
  });

  it("should throw an error when amount is negative", async () => {
    const user = User.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "SecurePassword123",
    });

    const userInput = {
      userId: user.getId(),
      name: "Savings Account",
      amount: -500,
      type: PaymentEnum.CREDIT,
    };

    await expect(
      createUserAccount.execute(user, userInput)
    ).rejects.toThrowError("Amount cannot be negative");

    expect(mockUserAccountRepository.create).not.toHaveBeenCalled();
  });
});
