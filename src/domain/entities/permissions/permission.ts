import { Entity } from '../../../core/domain/Entity';

export type PermissionProps = {
  name: string;
  description?: string;
  id?: string;
};

export class Permission extends Entity {
  private constructor(
    public readonly name: string,
    public readonly description?: string,
    id?: string
  ) {
    super(id);
  }

  static create(permissionData: PermissionProps): Permission {
    const { name, description, id } = permissionData;
    return new Permission(name, description, id);
  }
}
