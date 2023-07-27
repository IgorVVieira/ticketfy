import { UserAccount } from "../entities/user-accounts";
import { IGenericCreateRepository } from "./generic-create.repository";

export interface IUserAccountRepository
  extends IGenericCreateRepository<UserAccount> {
  findByUserId(user_id: string): Promise<UserAccount | null>;
}
