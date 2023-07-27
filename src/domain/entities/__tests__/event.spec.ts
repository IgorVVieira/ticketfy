import { Event } from "../event";

describe("Event", () => {
  it("should create a valid event", () => {
    const event = Event.create({
      event_owner_id: "1",
      name: "Igor",
      datetime: "2021-10-10T10:00:00",
      description: "Test",
      location: "Test",
      participants_limit: 10,
      unitary_price: 10,
    });

    expect(event).toBeTruthy();
    expect(event.props.name).toBe("Igor");
    expect(event.props.datetime).toBe("2021-10-10T10:00:00");
    expect(event.props.description).toBe("Test");
    expect(event.props.location).toBe("Test");
    expect(event.props.participants_limit).toBe(10);
    expect(event.props.unitary_price).toBe(10);
  });
});
