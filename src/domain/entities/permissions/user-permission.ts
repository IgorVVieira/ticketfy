import { Entity } from "../../../core/domain/Entity";

export type UserPermissionProps = {
  user_id: string;
  permission_id: string;
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

  static create({
    user_id: userId,
    permission_id: permissionId,
    id,
  }: UserPermissionProps): UserPermission {
    return new UserPermission(userId, permissionId, id);
  }
}
