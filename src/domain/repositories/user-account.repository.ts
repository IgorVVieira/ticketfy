import { UserAccount } from "../entities/user/user-account";
import { IGenericCreateRepository } from "./generic-create.repository";

export interface IUserAccountRepository
  extends IGenericCreateRepository<UserAccount> {
  findByUserId(userId: string): Promise<UserAccount | null>;
  findById(id: string): Promise<UserAccount | null>;
}
