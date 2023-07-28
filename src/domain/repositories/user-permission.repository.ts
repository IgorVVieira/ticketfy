import { UserPermission } from "../entities/user-permission";
import { IGenericCreateRepository } from "./generic-create.repository";

export interface IUserPermissionRepository
  extends IGenericCreateRepository<UserPermission> {}
