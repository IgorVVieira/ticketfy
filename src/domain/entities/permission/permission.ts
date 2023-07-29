import { Entity } from "../../../core/domain/Entity";

export type PermissionProps = {
  name: string;
  description: string;
  id?: string;
};

export class Permission extends Entity {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    id?: string
  ) {
    super(id);
  }

  static create({ name, description, id }: PermissionProps): Permission {
    return new Permission(name, description, id);
  }
}
