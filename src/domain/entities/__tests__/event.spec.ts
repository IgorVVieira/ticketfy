import { Event, EventStatus } from "../event/event";

describe("Event", () => {
  const event = Event.create({
    userId: "1",
    name: "Igor",
    datetime: "2021-10-10T10:00:00",
    description: "Test",
    location: "Test",
    participantsLimit: 10,
    unitaryPrice: 10,
    status: EventStatus.OPEN,
    avaliableTickets: 10,
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

  it("should not decrement available tickets", () => {
    event.decrementAvailableTickets(11);
    expect(event.avaliableTickets).toBe(7);
  });
});
