import { UserPermission } from "../../domain/entities/permissions/user-permission";
import { UserPermissionDB } from "../database/entities/user-permission";

export class UserPermissionMapper {
  static toDomain(userPermissionDB: UserPermissionDB): UserPermission {
    return UserPermission.create({
      id: userPermissionDB.id,
      userId: userPermissionDB.userId,
      permissionId: userPermissionDB.permissionId,
    });
  }

  static toPersistence(userPermission: UserPermission): UserPermissionDB {
    const userPermissionDB = new UserPermissionDB();
    userPermissionDB.id = userPermission.getId();
    userPermissionDB.userId = userPermission.userId;
    userPermissionDB.permissionId = userPermission.permissionId;
    return userPermissionDB;
  }
}
