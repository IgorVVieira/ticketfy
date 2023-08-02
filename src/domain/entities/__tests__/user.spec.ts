import { User, UserType } from "../users/user";

describe("User", () => {
  it("should create a user instance with valid properties", () => {
    const userProps = {
      name: "John Doe",
      email: "john@example.com",
      password: "Password123",
      picture: "profile.jpg",
      type: UserType.COMPRADOR,
      id: "user123",
    };

    const user = User.create(userProps);

    expect(user).toBeDefined();
    expect(user.name).toBe(userProps.name);
    expect(user.getEmail()).toBe(userProps.email);
    expect(user.getPassword()).toBe(userProps.password);
    expect(user.getPicture()).toBe(userProps.picture);
    expect(user.type).toBe(userProps.type);
    expect(user.getId()).toBe(userProps.id);
  });

  it("should throw an error when creating a user with an invalid email", () => {
    const userProps = {
      name: "John Doe",
      email: "invalid-email",
      password: "Password123",
    };

    expect(() => User.create(userProps)).toThrow("Invalid email");
  });

  it("should throw an error when creating a user with an invalid password", () => {
    const userProps = {
      name: "John Doe",
      email: "john@example.com",
      password: "weak",
    };

    expect(() => User.create(userProps)).toThrow("Invalid password");
  });

  it("should update the user picture", () => {
    const userProps = {
      name: "John Doe",
      email: "john@example.com",
      password: "Password123",
      picture: "profile.jpg",
    };

    const user = User.create(userProps);

    const newPicture = "new-profile.jpg";
    user.updatePicture(newPicture);

    expect(user.getPicture()).toBe(newPicture);
  });
});
