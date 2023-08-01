import { UserPermission } from "../../../domain/entities/permissions/user-permission";
import { IUserPermissionRepository } from "../../../domain/repositories/users/user-permission.repository";

export class FindUserPermission {
  constructor(
    private readonly userPermissionRepository: IUserPermissionRepository
  ) {}

  async execute(userId: string, name: string): Promise<UserPermission> {
    const permission = await this.userPermissionRepository.findByUserIdAndName(
      userId,
      name
    );
    if (!permission) {
      throw new Error("Permission not found");
    }
    return permission;
  }
}
