import { inject, injectable } from 'inversify';

import { MyMulterFile } from '../../@types/multer';
import { CreateEventPhoto } from '../../application/usecases/event/create-event-photo';
import BusinessError from '../../core/domain/business-error';
import { EventPhotoProps } from '../../domain/entities/events/event-photo';
import { EventService } from './event.service';
import { IEventPhotoServiceInterface } from './interfaces/event-photo.service.interface';
import { TYPES } from '../shared/types';

@injectable()
export class EventPhotoService implements IEventPhotoServiceInterface {
  constructor(
    private readonly createEventUseCase: CreateEventPhoto,
    @inject(TYPES.EventService) private readonly eventService: EventService
  ) {
  }

  async createMany(eventId: string, files: MyMulterFile[]): Promise<void> {
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

    return this.createEventUseCase.execute(event, eventPhotos, eventPhotos.length);
  }
}
