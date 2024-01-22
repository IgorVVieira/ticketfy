import { MyMulterFile } from '../../../@types/multer';

export interface IEventPhotoServiceInterface {
  createMany(eventId: string, files: MyMulterFile[]): Promise<void>;
}
