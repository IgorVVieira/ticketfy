import { Entity } from "../../../core/domain/Entity";

export type EventPhotoProps = {
  event_id: string;
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

  static create({ event_id: eventId, url, id }: EventPhotoProps): EventPhoto {
    return new EventPhoto(eventId, url, id);
  }
}
