import { Permission } from "../entities/permission/permission";
import { IGenericCreateRepository } from "./generic-create.repository";

export interface IPermissionRepository
  extends IGenericCreateRepository<Permission> {}
