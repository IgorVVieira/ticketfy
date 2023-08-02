import { User, UserProps } from "../../../../domain/entities/users/user";
import { IUserRepository } from "../../../../domain/repositories/users/user.repository";
import { CreateUser } from "../../user/create-user";

class MockUserRepository implements IUserRepository {
  private users: User[] = [];

  async findBy(key: string, value: string): Promise<User | null> {
    return (
      this.users.find((user) => user[key as keyof UserProps] === value) || null
    );
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async update(id: string, user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.getId() === id);
    if (index !== -1) {
      this.users[index] = user;
    }
    return user;
  }
}

describe("CreateUser", () => {
  let userRepository: IUserRepository;
  let createUser: CreateUser;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    createUser = new CreateUser(userRepository);
  });

  it("should create a new user when the email is not in use", async () => {
    const userData: UserProps = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "SecurePass123",
    };

    const user = await createUser.execute(userData);

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe(userData.name);
    expect(user.getEmail()).toBe(userData.email);
  });

  it("should throw an error when the email is already in use", async () => {
    const existingUser: UserProps = {
      name: "Existing User",
      email: "existing.user@example.com",
      password: "ExistingPass123",
    };

    userRepository.create(User.create(existingUser));

    const userData: UserProps = {
      name: "John Doe",
      email: existingUser.email,
      password: "SecurePass123",
    };

    await expect(createUser.execute(userData)).rejects.toThrow(
      "Email already in use"
    );
  });

  it("should throw an error when the email is invalid", async () => {
    const userData: UserProps = {
      name: "John Doe",
      email: "invalid-email",
      password: "SecurePass123",
    };

    await expect(createUser.execute(userData)).rejects.toThrow("Invalid email");
  });

  it("should throw an error when the password is invalid", async () => {
    const userData: UserProps = {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "weak",
    };

    await expect(createUser.execute(userData)).rejects.toThrow(
      "Invalid password"
    );
  });
});
