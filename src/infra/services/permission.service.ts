import { injectable } from 'inversify';

import { CreatePermission } from '../../application/usecases/permission/create-permission';
import { FindPermission } from '../../application/usecases/permission/find-permission';
import { Permission } from '../../domain/entities/permissions/permission';
import { IPersmissionServiceInterface } from './interfaces/permission.service.interface';

@injectable()
export class PermissionService implements IPersmissionServiceInterface {
  constructor(
    private readonly createPermission: CreatePermission,
    private readonly findPermission: FindPermission
  ) {
  }

  async find(key: string, value: string): Promise<Permission> {
    return this.findPermission.execute(key, value);
  }

  async create(name: string, description?: string): Promise<Permission> {
    return this.createPermission.execute({ name, description });
  }
}
