import { User } from "../user";

describe("User", () => {
  it("should create a valid user", () => {
    const user = User.create({
      name: "Igor",
      email: "igor.gutoo63@gmail.com",
      password: "!Test123",
    });

    expect(user).toBeTruthy();
    expect(user.props.name).toBe("Igor");
    expect(user.props.email).toBe("igor.gutoo63@gmail.com");
  });

  it("should throw an error if email is invalid", () => {
    expect(() =>
      User.create({
        name: "Igor",
        email: "invalid-email",
        password: "!Test123",
      })
    ).toThrowError("Invalid email");
  });

  it("should throw an error if password is invalid", () => {
    expect(() =>
      User.create({
        name: "Igor",
        email: "igor.gutoo63@gmail.com",
        password: "!test123",
      })
    ).toThrowError("Invalid password");
  });
});
