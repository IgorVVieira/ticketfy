import { Consumer } from "../consumer/consumer";
import { UserProps } from "../user";

describe("Consumer", () => {
  const validUserProps: UserProps = {
    name: "Igor",
    email: "igor.gutoo63@gmail.com",
    password: "!Test123",
  };

  it("should create a valid consumer", () => {
    const consumer = Consumer.create(validUserProps);

    expect(consumer).toBeTruthy();
    expect(consumer.props.name).toBe("Igor");
    expect(consumer.props.email).toBe("igor.gutoo63@gmail.com");
  });

  it("should throw an error if email is invalid", () => {
    expect(() =>
      Consumer.create({
        ...validUserProps,
        email: "invalid-email",
      })
    ).toThrowError("Invalid email");
  });

  it("should throw an error if password is invalid", () => {
    expect(() =>
      Consumer.create({
        ...validUserProps,
        password: "invalid-password",
      })
    ).toThrowError("Invalid password");
  });
});
