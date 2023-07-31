import { UserPermission } from "../../domain/entities/permissions/user-permission";
import { UserPermissionDB } from "../database/entities/user-permission";

export class UserPermissionMapper {
  static toDomain(userPermissionDB: UserPermissionDB): UserPermission {
    return UserPermission.create({
      id: userPermissionDB.id,
      user_id: userPermissionDB.user_id,
      permission_id: userPermissionDB.permission_id,
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
