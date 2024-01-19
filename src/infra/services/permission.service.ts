import { CreatePermission } from '../../application/usecases/permission/create-permission';
import { FindPermission } from '../../application/usecases/permission/find-permission';
import { Permission } from '../../domain/entities/permissions/permission';

export class PermissionService {
  constructor(
    private readonly createPermission: CreatePermission,
    private readonly findPermission: FindPermission
  ) {
    this.create = this.create.bind(this);
    this.find = this.find.bind(this);
  }

  async find(key: string, value: string): Promise<Permission> {
    return this.findPermission.execute(key, value);
  }

  async create(name: string, description?: string): Promise<Permission> {
    return this.createPermission.execute({ name, description });
  }
}
