import { Permission } from "../../domain/entities/permissions/permission";
import { PermissionDB } from "../database/entities/permission";

export class PermissionMapper {
  static toDomain(permissionDB: PermissionDB): Permission {
    return Permission.create({
      id: permissionDB.id,
      name: permissionDB.name,
      description: permissionDB.description,
    });
  }

  static toPersistence(permission: Permission): PermissionDB {
    const permissionDB = new PermissionDB();
    permissionDB.id = permission.getId();
    permissionDB.name = permission.name;
    permissionDB.description = permission.description;
    return permissionDB;
  }
}
