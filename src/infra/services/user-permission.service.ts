import { CreateUserPermission } from '../../application/usecases/permission/create-user-permission';
import { FindUserPermission } from '../../application/usecases/permission/find-user-permission';
import { UserPermission } from '../../domain/entities/permissions/user-permission';
import { PermissionService } from './permission.service';
import { UserService } from './user.service';

export class UserPermissionService {
  constructor(
    private readonly createUserPermission: CreateUserPermission,
    private readonly findUserPermission: FindUserPermission,
    private readonly userService: UserService,
    private readonly permissionService: PermissionService
  ) {
    this.create = this.create.bind(this);
    this.findByUserIdAndName = this.findByUserIdAndName.bind(this);
  }

  async create(
    userId: string,
    permissionId: string
  ): Promise<UserPermission | null> {
    const [user, permission] = await Promise.all([
      this.userService.findById('id', userId),
      this.permissionService.find('id', permissionId)
    ]);
    return this.createUserPermission.execute(user, permission);
  }

  async findByUserIdAndName(
    userId: string,
    name: string
  ): Promise<UserPermission> {
    return this.findUserPermission.execute(userId, name);
  }
}
