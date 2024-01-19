import { Event } from '../../domain/entities/events/event';
import { EventDB } from '../database/entities/event';

export class EventMapper {
  static toDomain(eventDB: EventDB): Event {
    return Event.create({
      id: eventDB.id,
      userId: eventDB.userId,
      name: eventDB.name,
      datetime: eventDB.datetime,
      description: eventDB.description,
      location: eventDB.location,
      participants_limit: eventDB.participants_limit,
      unitary_price: eventDB.unitary_price,
      status: eventDB.eventStatus,
      avaliable_tickets: eventDB.avaliable_tickets,
      photos: eventDB.photos ? eventDB.photos.map((photo) => photo.url) : []
    });
  }

  static toPersistence(event: Event): EventDB {
    const eventDB = new EventDB();
    eventDB.id = event.getId();
    eventDB.userId = event.userId;
    eventDB.name = event.name;
    eventDB.datetime = event.datetime;
    eventDB.description = event.description;
    eventDB.location = event.location;
    eventDB.participants_limit = event.participantsLimit;
    eventDB.unitary_price = event.unitaryPrice;
    eventDB.eventStatus = event.getStatus();
    eventDB.avaliable_tickets = event.avaliableTickets;
    return eventDB;
  }
}
