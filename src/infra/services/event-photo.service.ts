import { MyMulterFile } from '../../@types/multer';
import { CreateEventPhoto } from '../../application/usecases/event/create-event-photo';
import BusinessError from '../../core/domain/business-error';
import { EventPhotoProps } from '../../domain/entities/events/event-photo';
import { EventService } from './event.service';

export class EventPhotoService {
  constructor(
    private readonly eventRepository: CreateEventPhoto,
    private readonly eventService: EventService
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(eventId: string, files: MyMulterFile[]): Promise<void> {
    const event = await this.eventService.findById(eventId);
    if (!event) {
      throw new BusinessError('Event not found');
    }

    const eventPhotos: EventPhotoProps[] = [];
    for (const file of files) {
      eventPhotos.push({
        eventId: event.getId(),
        url: file.location as string
      });
    }

    return this.eventRepository.execute(event, eventPhotos, eventPhotos.length);
  }
}
