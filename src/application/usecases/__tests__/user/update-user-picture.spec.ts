import { User, UserType } from "../../../../domain/entities/users/user";
import { IUserRepository } from "../../../../domain/repositories/users/user.repository";
import { UpdateUserPicture } from "../../user/update-user-picture";

const mockUserRepository: IUserRepository = {
  findBy: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe("UpdateUserPicture", () => {
  let updateUserPicture: UpdateUserPicture;

  beforeEach(() => {
    updateUserPicture = new UpdateUserPicture(mockUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should update the picture of an existing user", async () => {
    const existingUser = User.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "SecurePassword123",
      type: UserType.COMPRADOR,
    });

    (mockUserRepository.findBy as jest.Mock).mockResolvedValueOnce(
      existingUser
    );

    const newPicture = "https://example.com/new-picture.jpg";
    const updatedUser = { ...existingUser, picture: newPicture };

    (mockUserRepository.update as jest.Mock).mockResolvedValueOnce(updatedUser);

    const userId = existingUser.getId();
    const user = await updateUserPicture.execute(userId, newPicture);

    expect(mockUserRepository.findBy).toHaveBeenCalledWith("id", userId);

    expect(mockUserRepository.update).toHaveBeenCalledWith(userId, updatedUser);

    expect(user).toEqual(updatedUser);
  });

  it("should throw an error when trying to update picture for a non-existing user", async () => {
    const nonExistingUser = null;

    (mockUserRepository.findBy as jest.Mock).mockResolvedValueOnce(
      nonExistingUser
    );

    const userId = "nonExistingUserId";
    const newPicture = "https://example.com/new-picture.jpg";
    await expect(
      updateUserPicture.execute(userId, newPicture)
    ).rejects.toThrowError("User not found");

    expect(mockUserRepository.findBy).toHaveBeenCalledWith("id", userId);

    expect(mockUserRepository.update).not.toHaveBeenCalled();
  });
});
