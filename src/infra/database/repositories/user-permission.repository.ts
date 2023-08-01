import { Repository } from "typeorm";
import { IUserPermissionRepository } from "../../../domain/repositories/users/user-permission.repository";
import { UserPermissionDB } from "../entities/user-permission";
import { UserPermission } from "../../../domain/entities/permissions/user-permission";
import { UserPermissionMapper } from "../../mapper/user-permission.mapper";

export class UserPermissionRepository implements IUserPermissionRepository {
  constructor(private readonly repository: Repository<UserPermissionDB>) {}

  async findByUseridAndPermissionId(
    userId: string,
    permissionId: string
  ): Promise<UserPermission | null> {
    const userPermissionDB = await this.repository.findOne({
      where: { userId, permissionId },
    });
    if (!userPermissionDB) return null;
    return UserPermissionMapper.toDomain(userPermissionDB);
  }

  async findByUserIdAndName(
    userId: string,
    name: string
  ): Promise<UserPermission | null> {
    const userPermissionDB = await this.repository.findOne({
      where: { userId, permission: { name } },
    });
    if (!userPermissionDB) return null;
    return UserPermissionMapper.toDomain(userPermissionDB);
  }

  async create(entity: UserPermission): Promise<UserPermission> {
    const userPermissionDB = UserPermissionMapper.toPersistence(entity);
    const createdUserPermission = this.repository.create(userPermissionDB);
    await this.repository.save(createdUserPermission);
    return UserPermissionMapper.toDomain(createdUserPermission);
  }
}
