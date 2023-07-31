import { Repository } from "typeorm";
import {
  IEventRepository,
  findAllProps,
} from "../../../domain/repositories/events/event.repository";
import { EventDB } from "../entities/event";
import { Event } from "../../../domain/entities/events/event";
import { EventMapper } from "../../mapper/event.mapper";

export class EventRepository implements IEventRepository {
  constructor(private readonly repository: Repository<EventDB>) {}

  async findAll(props?: findAllProps | undefined): Promise<Event[]> {
    const eventsDB = await this.repository.find({
      where: { ...props },
    });

    return eventsDB.map((eventDB) => EventMapper.toDomain(eventDB));
  }

  async findById(id: string): Promise<Event | null> {
    const eventDB = await this.repository.findOne({ where: { id } });
    if (!eventDB) return null;
    return EventMapper.toDomain(eventDB);
  }

  async findByOwner(userId: string): Promise<Event[]> {
    const eventsDB = await this.repository.find({ where: { user_id: userId } });
    return eventsDB.map((eventDB) => EventMapper.toDomain(eventDB));
  }

  async update(id: string, event: Event): Promise<Event> {
    const eventDB = EventMapper.toPersistence(event);
    await this.repository.update(id, eventDB);
    return EventMapper.toDomain(eventDB);
  }

  async create(entity: Event): Promise<Event> {
    const eventDB = EventMapper.toPersistence(entity);
    const createdEvent = this.repository.create(eventDB);
    await this.repository.save(createdEvent);
    return EventMapper.toDomain(createdEvent);
  }
}
