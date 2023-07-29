import { Repository } from "typeorm";
import { Permission } from "../../../domain/entities/permission/permission";
import { IPermissionRepository } from "../../../domain/repositories/permission.repository";
import { getRepository } from "typeorm";

export class PermissionRepository implements IPermissionRepository {
  constructor(private readonly repository: Repository<Permission>) {}

  async findByName(name: string): Promise<Permission | null> {
    // return this.repository.findOneBy({ name });
    throw new Error("Method not implemented.");
  }
  create(entity: Permission): Promise<Permission> {
    return this.repository.save(entity);
  }
}
