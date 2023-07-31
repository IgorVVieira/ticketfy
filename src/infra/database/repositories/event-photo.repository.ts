import { Repository } from "typeorm";
import { IEventPhotoRepository } from "../../../domain/repositories/event/event-photo.repository";
import { EventPhotoDB } from "../entities/event-photo";
import { EventPhoto } from "../../../domain/entities/event/event-photo";
import { EventPhotoMapper } from "../../mapper/event-photo.mapper";

export class EventPhotoRepository implements IEventPhotoRepository {
  constructor(private readonly repository: Repository<EventPhotoDB>) {}

  async createMany(eventPhoto: EventPhoto[]): Promise<void> {
    const eventPhotosDB = eventPhoto.map((eventPhoto) =>
      EventPhotoMapper.toPersistence(eventPhoto)
    );
    const createdEventPhotos = this.repository.create(eventPhotosDB);
    await this.repository.save(createdEventPhotos);
  }
}
