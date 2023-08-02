import { Event, EventStatus } from "../events/event";

describe("Event", () => {
  const event = Event.create({
    userId: "1",
    name: "Igor",
    datetime: "2021-10-10T10:00:00",
    description: "Test",
    location: "Test",
    participants_limit: 10,
    unitary_price: 10,
    status: EventStatus.OPEN,
    avaliable_tickets: 10,
  });

  it("should create a valid event", () => {
    expect(event).toBeTruthy();
    expect(event.name).toBe("Igor");
    expect(event.datetime).toBe("2021-10-10T10:00:00");
    expect(event.description).toBe("Test");
    expect(event.location).toBe("Test");
    expect(event.participantsLimit).toBe(10);
    expect(event.unitaryPrice).toBe(10);
    expect(event.getStatus()).toBe(EventStatus.OPEN);
    expect(event.avaliableTickets).toBe(10);
  });

  it("should decrement available tickets", () => {
    event.decrementAvailableTickets(3);
    expect(event.avaliableTickets).toBe(7);
  });

  it("should throw an error when decrementing more tickets than available", () => {
    expect(() => event.decrementAvailableTickets(8)).toThrowError(
      "Event has no available tickets"
    );
  });
});
