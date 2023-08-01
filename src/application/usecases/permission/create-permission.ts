import {
  Permission,
  PermissionProps,
} from "../../../domain/entities/permissions/permission";
import { IPermissionRepository } from "../../../domain/repositories/permission.repository";

export class CreatePermission {
  constructor(private readonly permissionRepository: IPermissionRepository) {}

  async execute(input: PermissionProps): Promise<Permission> {
    const permissionExists = await this.permissionRepository.findBy(
      "name",
      input.name
    );
    if (permissionExists) {
      throw new Error("Permission already exists");
    }
    const permission = Permission.create(input);
    return this.permissionRepository.create(permission);
  }
}
