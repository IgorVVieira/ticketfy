import { Entity } from '../../../core/domain/Entity';

export type UserPermissionProps = {
  userId: string;
  permissionId: string;
  id?: string;
};

export class UserPermission extends Entity {
  private constructor(
    public readonly userId: string,
    public readonly permissionId: string,
    id?: string
  ) {
    super(id);
  }

  static create(userPermissionData: UserPermissionProps): UserPermission {
    const { userId, permissionId, id } = userPermissionData;
    return new UserPermission(userId, permissionId, id);
  }
}
