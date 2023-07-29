import { EventOwner, EventOwnerType } from "../event/event-owner";
import { UserProps } from "../user";

describe("EventOwner", () => {
  const validUserProps: UserProps = {
    name: "MB Labs",
    email: "mblabs@gmail.com",
    password: "!Test123",
  };

  it("should create a valid event owner", () => {
    const eventOwner = EventOwner.create(
      validUserProps,
      EventOwnerType.EMPRESA
    );
    expect(true).toBeTruthy();

    expect(eventOwner.props.name).toBe("MB Labs");
    expect(eventOwner.getType()).toBe(EventOwnerType.EMPRESA);
  });

  it("should throw an error if email is invalid", () => {
    expect(() =>
      EventOwner.create(
        {
          ...validUserProps,
          email: "invalid-email",
        },
        EventOwnerType.EMPRESA
      )
    ).toThrowError("Invalid email");
  });

  it("should throw an error if password is invalid", () => {
    expect(() =>
      EventOwner.create(
        {
          ...validUserProps,
          password: "invalid-password",
        },
        EventOwnerType.EMPRESA
      )
    ).toThrowError("Invalid password");
  });
});
