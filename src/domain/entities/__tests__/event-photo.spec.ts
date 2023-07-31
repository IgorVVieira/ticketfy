import { EventPhoto } from "../event/event-photo";

describe("EventPhoto", () => {
  it("should create a valid event photo", () => {
    const eventPhoto = EventPhoto.create({
      event_id: "1",
      url: "https://www.google.com",
    });

    expect(eventPhoto).toBeTruthy();
    expect(eventPhoto.eventId).toBe("1");
    expect(eventPhoto.url).toBe("https://www.google.com");
  });
});
