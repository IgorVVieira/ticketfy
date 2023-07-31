import { Repository } from "typeorm";
import { IPermissionRepository } from "../../../domain/repositories/permission.repository";
import { PermissionDB } from "../entities/permission";
import { Permission } from "../../../domain/entities/permissions/permission";
import { PermissionMapper } from "../../mapper/permission.mapper";

export class PermissionRepository implements IPermissionRepository {
  constructor(private readonly repository: Repository<PermissionDB>) {}

  async findByName(name: string): Promise<Permission | null> {
    const permissionDB = await this.repository.findOne({ where: { name } });
    if (!permissionDB) return null;
    return PermissionMapper.toDomain(permissionDB);
  }

  async create(entity: Permission): Promise<Permission> {
    const permissionDB = PermissionMapper.toPersistence(entity);
    const createdPermission = this.repository.create(permissionDB);
    await this.repository.save(createdPermission);
    return PermissionMapper.toDomain(createdPermission);
  }
}
