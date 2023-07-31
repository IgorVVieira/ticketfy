import { Permission } from "../../domain/entities/permission/permission";
import { UserPermission } from "../../domain/entities/permission/user-permission";
import { PermissionDB } from "../database/entities/permission";
import { UserPermissionDB } from "../database/entities/user-permission";

export class UserPermissionMapper {
  static toDomain(userPermissionDB: UserPermissionDB): UserPermission {
    return UserPermission.create({
      id: userPermissionDB.id,
      userId: userPermissionDB.user_id,
      permissionId: userPermissionDB.permission_id,
    });
  }

  static toPersistence(userPermission: UserPermission): UserPermissionDB {
    const userPermissionDB = new UserPermissionDB();
    userPermissionDB.id = userPermission.getId();
    userPermissionDB.user_id = userPermission.userId;
    userPermissionDB.permission_id = userPermission.permissionId;
    return userPermissionDB;
  }
}
