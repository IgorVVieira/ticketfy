import { Permission } from '../../../domain/entities/permissions/permission';

export interface IPersmissionServiceInterface {
  find(key: string, value: string): Promise<Permission>;
  create(name: string, description?: string): Promise<Permission>;
}
