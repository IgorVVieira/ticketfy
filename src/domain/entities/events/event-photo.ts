import { Entity } from '../../../core/domain/Entity';

export type EventPhotoProps = {
  eventId: string;
  url: string;
  id?: string;
};

export class EventPhoto extends Entity {
  private constructor(
    public readonly eventId: string,
    public readonly url: string,
    id?: string
  ) {
    super(id);
  }

  static create(eventPhotoData: EventPhotoProps): EventPhoto {
    const { eventId, url, id } = eventPhotoData;
    return new EventPhoto(eventId, url, id);
  }
}
