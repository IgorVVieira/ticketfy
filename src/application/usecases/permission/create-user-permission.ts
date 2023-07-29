import { Permission } from "../../../domain/entities/permission/permission";
import {
  UserPermission,
  UserPermissionProps,
} from "../../../domain/entities/permission/user-permission";
import { User } from "../../../domain/entities/user";
import { IUserPermissionRepository } from "../../../domain/repositories/user-permission.repository";

export class CreateUserPermission {
  constructor(
    private readonly userPermissionRepository: IUserPermissionRepository
  ) {}

  async execute(user: User, permission: Permission): Promise<UserPermission> {
    const permissionExists =
      await this.userPermissionRepository.findByUseridAndPermissionId(
        user.getId(),
        permission.getId()
      );
    if (permissionExists) {
      throw new Error("Permission already exists");
    }

    const props: UserPermissionProps = {
      userId: user.getId(),
      permissionId: permission.getId(),
    };
    const userPermission = UserPermission.create({ ...props });
    return this.userPermissionRepository.create(userPermission);
  }
}
