import { Entity } from "../../../core/domain/Entity";

type UserPermissionProps = {
  user_id: string;
  permission_id: string;
};

export class UserPermission extends Entity<UserPermissionProps> {
  private constructor(props: UserPermissionProps, id?: string) {
    super(props, id);
  }

  static create(props: UserPermissionProps, id?: string): UserPermission {
    return new UserPermission(props, id);
  }
}
