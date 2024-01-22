import { inject, injectable } from 'inversify';

import { CreateUserPermission } from '../../application/usecases/permission/create-user-permission';
import { FindUserPermission } from '../../application/usecases/permission/find-user-permission';
import { UserPermission } from '../../domain/entities/permissions/user-permission';
import { PermissionService } from './permission.service';
import { UserService } from './user.service';
import { IUserPermissionServiceInterface } from './interfaces/user-permission.service.interface';
import { TYPES } from '../shared/types';

@injectable()
export class UserPermissionService implements IUserPermissionServiceInterface {
  constructor(
    private readonly createUserPermission: CreateUserPermission,
    private readonly findUserPermission: FindUserPermission,
    @inject(TYPES.UserService) private readonly userService: UserService,
    @inject(TYPES.PermissionService) private readonly permissionService: PermissionService
  ) {
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
