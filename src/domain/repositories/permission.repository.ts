import { Permission } from "../entities/permissions/permission";
import { IGenericCreateRepository } from "./generic-create.repository";

export interface IPermissionRepository
  extends IGenericCreateRepository<Permission> {
  findBy(key: string, value: string): Promise<Permission | null>;
}
