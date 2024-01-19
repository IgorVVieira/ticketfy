import { Event } from '../../../domain/entities/events/event';
import {
  EventPhoto,
  EventPhotoProps
} from '../../../domain/entities/events/event-photo';
import { IEventPhotoRepository } from '../../../domain/repositories/events/event-photo.repository';

export class CreateEventPhoto {
  constructor(private readonly eventPhotoRepository: IEventPhotoRepository) { }

  async execute(
    event: Event,
    input: EventPhotoProps[],
    quantity: number
  ): Promise<void> {
    const eventPhotos: EventPhoto[] = [];

    for (let i = 0; i < quantity; i++) {
      const eventId = event.getId();
      eventPhotos.push(
        EventPhoto.create({
          ...input[i],
          eventId: eventId
        })
      );
    }
    this.eventPhotoRepository.createMany(eventPhotos);
  }
}
