import { Entity } from "../../core/domain/Entity";

type PermissionProps = {
  name: string;
  description: string;
}

export class Permission extends Entity<PermissionProps> {
  private constructor(props: PermissionProps, id?: string) {
    super(props, id);
  }

  static create(props: PermissionProps, id?: string): Permission {
    return new Permission(props, id);
  }
}