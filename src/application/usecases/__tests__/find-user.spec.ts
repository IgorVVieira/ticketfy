import { User } from "../../../domain/entities/users/user";
import { IUserRepository } from "../../../domain/repositories/users/user.repository";
import { FindUser } from "../user/find-user";

// Mock the user repository
const mockUserRepository: IUserRepository = {
  create: jest.fn(),
  findBy: jest.fn(),
  update: jest.fn(),
};

describe("FindUser", () => {
  let findUser: FindUser;

  beforeEach(() => {
    findUser = new FindUser(mockUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should find and return a user when user exists", async () => {
    const mockUser: User = User.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "SecurePassword123",
    });

    (mockUserRepository.findBy as jest.Mock).mockResolvedValueOnce(mockUser);

    const user = await findUser.execute("email", "johndoe@example.com");

    expect(mockUserRepository.findBy).toHaveBeenCalledWith(
      "email",
      "johndoe@example.com"
    );

    expect(user).toEqual(mockUser);
  });

  it("should throw an error when user does not exist", async () => {
    (mockUserRepository.findBy as jest.Mock).mockResolvedValueOnce(null);

    const executePromise = findUser.execute("email", "nonexistent@example.com");

    expect(mockUserRepository.findBy).toHaveBeenCalledWith(
      "email",
      "nonexistent@example.com"
    );

    await expect(executePromise).rejects.toThrowError("User not found");
  });
});
