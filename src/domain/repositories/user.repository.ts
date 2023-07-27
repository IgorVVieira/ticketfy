import { User } from "../entities/user";
import { IGenericCreateRepository } from "./generic-create.repository";

export interface IUserRepository extends IGenericCreateRepository<User> {
  findByEmail(email: string): Promise<User | null>;
}
