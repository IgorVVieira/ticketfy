import { Entity } from "../../../core/domain/Entity";

export type EventPhotoProps = {
  event_id: string;
  url: string;
};

export class EventPhoto extends Entity<EventPhotoProps> {
  private constructor(props: EventPhotoProps, id?: string) {
    super(props, id);
  }

  static create(props: EventPhotoProps, id?: string): EventPhoto {
    return new EventPhoto(props, id);
  }
}
