import { EventPhoto } from '../../entities/events/event-photo';

export interface IEventPhotoRepository {
  createMany(eventPhoto: EventPhoto[]): Promise<void>;
}
