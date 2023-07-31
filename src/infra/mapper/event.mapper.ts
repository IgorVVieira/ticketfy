import { Event } from "../../domain/entities/event/event";
import { EventDB } from "../database/entities/event";

export class EventMapper {
  static toDomain(eventDB: EventDB): Event {
    return Event.create({
      id: eventDB.id,
      userId: eventDB.user_id,
      name: eventDB.name,
      datetime: eventDB.datetime,
      description: eventDB.description,
      location: eventDB.location,
      participantsLimit: eventDB.participants_limit,
      unitaryPrice: eventDB.unitary_price,
      status: eventDB.eventStatus,
      avaliableTickets: eventDB.avaliable_tickets,
    });
  }

  static toPersistence(event: Event): EventDB {
    const eventDB = new EventDB();
    eventDB.id = event.getStatus();
    eventDB.user_id = event.userId;
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
