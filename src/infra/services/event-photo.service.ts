import { CreateEventPhoto } from "../../application/usecases/event/create-event-photo";
import { EventPhotoProps } from "../../domain/entities/events/event-photo";
import { EventService } from "./event.service";

export class EventPhotoService {
  constructor(
    private readonly eventRepository: CreateEventPhoto,
    private readonly eventService: EventService
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(eventId: string, files: Express.Multer.File[]) {
    const event = await this.eventService.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    const eventPhotos: EventPhotoProps[] = [];
    for (const file of files) {
      eventPhotos.push({
        eventId: event.getId(),
        // @ts-ignore
        url: file.location,
      });
    }

    return this.eventRepository.execute(event, eventPhotos, eventPhotos.length);
  }
}
