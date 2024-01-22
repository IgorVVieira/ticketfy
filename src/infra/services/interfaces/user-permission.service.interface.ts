import { UserPermission } from '../../../domain/entities/permissions/user-permission';

export interface IUserPermissionServiceInterface {
  create(
    userId: string,
    permissionId: string
  ): Promise<UserPermission | null>;

  findByUserIdAndName(
    userId: string,
    name: string
  ): Promise<UserPermission>;
}
