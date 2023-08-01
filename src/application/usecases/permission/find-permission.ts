import { Permission } from "../../../domain/entities/permissions/permission";
import { IPermissionRepository } from "../../../domain/repositories/permission.repository";

export class FindPermission {
  constructor(private readonly permissionRepository: IPermissionRepository) {}

  async execute(key: string, value: string): Promise<Permission> {
    const permission = await this.permissionRepository.findBy(key, value);
    if (!permission) {
      throw new Error("Permission not found");
    }
    return permission;
  }
}
