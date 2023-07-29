import { Entity } from "../../../core/domain/Entity";

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

  static create({
    userId,
    permissionId,
    id,
  }: UserPermissionProps): UserPermission {
    return new UserPermission(userId, permissionId, id);
  }
}
