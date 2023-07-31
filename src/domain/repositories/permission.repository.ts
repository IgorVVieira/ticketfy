import { Permission } from "../entities/permissions/permission";
import { IGenericCreateRepository } from "./generic-create.repository";

export interface IPermissionRepository
  extends IGenericCreateRepository<Permission> {
  findByName(name: string): Promise<Permission | null>;
}
