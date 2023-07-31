import { EventPhoto } from "../../entities/event/event-photo";

export interface IEventPhotoRepository {
  createMany(eventPhoto: EventPhoto[]): Promise<void>;
}
