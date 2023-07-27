import { EventOwner, EventOwnerType } from "../event-owners";

describe("EventOwner", () => {
  it("should create a valid event owner", () => {
    const eventOwner = EventOwner.create({
      name: "MB Labs",
      type: EventOwnerType.EMPRESA,
    });
    expect(true).toBeTruthy();

    expect(eventOwner.props.name).toBe("MB Labs");
    expect(eventOwner.props.type).toBe(EventOwnerType.EMPRESA);
  });
});
