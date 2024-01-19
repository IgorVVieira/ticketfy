import { EventPhoto } from '../../domain/entities/events/event-photo';
import { EventPhotoDB } from '../database/entities/event-photo';

export class EventPhotoMapper {
  static toDomain(eventPhotoDB: EventPhotoDB): EventPhoto {
    return EventPhoto.create({
      id: eventPhotoDB.id,
      eventId: eventPhotoDB.eventId,
      url: eventPhotoDB.url
    });
  }

  static toPersistence(eventPhoto: EventPhoto): EventPhotoDB {
    const eventPhotoDB = new EventPhotoDB();
    eventPhotoDB.id = eventPhoto.getId();
    eventPhotoDB.eventId = eventPhoto.eventId;
    eventPhotoDB.url = eventPhoto.url;
    return eventPhotoDB;
  }
}
