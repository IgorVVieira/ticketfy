import { Event } from "../../../../domain/entities/events/event";
import {
  EventPhoto,
  EventPhotoProps,
} from "../../../../domain/entities/events/event-photo";
import { IEventPhotoRepository } from "../../../../domain/repositories/events/event-photo.repository";
import { CreateEventPhoto } from "../../event/create-event-photo";

class MockEventPhotoRepository implements IEventPhotoRepository {
  private eventPhotos: EventPhoto[] = [];

  async createMany(eventPhotos: EventPhoto[]): Promise<void> {
    this.eventPhotos.push(...eventPhotos);
  }
}

describe("CreateEventPhoto", () => {
  let eventPhotoRepository: IEventPhotoRepository;
  let createEventPhoto: CreateEventPhoto;

  beforeEach(() => {
    eventPhotoRepository = new MockEventPhotoRepository();
    createEventPhoto = new CreateEventPhoto(eventPhotoRepository);
  });

  it("should create multiple event photos", async () => {
    const event: Event = Event.create({
      userId: "user123",
      name: "Test Event",
      datetime: "2023-08-01T12:00:00",
      location: "Test Location",
      participants_limit: 100,
      unitary_price: 20,
      avaliable_tickets: 100,
    });

    const eventPhotos: EventPhotoProps[] = [
      { eventId: event.getId(), url: "photo-url-1" },
      { eventId: event.getId(), url: "photo-url-2" },
      { eventId: event.getId(), url: "photo-url-3" },
    ];

    const quantity = eventPhotos.length;

    await createEventPhoto.execute(event, eventPhotos, quantity);
    expect(eventPhotoRepository).toBeInstanceOf(MockEventPhotoRepository);
    expect(eventPhotoRepository).toHaveProperty("createMany");
  });
});
