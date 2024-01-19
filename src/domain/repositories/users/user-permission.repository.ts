import { UserPermission } from '../../entities/permissions/user-permission';
import { IGenericCreateRepository } from '../generic-create.repository';

export interface IUserPermissionRepository
  extends IGenericCreateRepository<UserPermission> {
  findByUseridAndPermissionId(
    userId: string,
    permissionId: string
  ): Promise<UserPermission | null>;

  findByUserIdAndName(
    userId: string,
    name: string
  ): Promise<UserPermission | null>;
}
