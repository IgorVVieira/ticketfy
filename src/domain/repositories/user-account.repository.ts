import { UserAccount } from "../entities/user/user-account";
import { IGenericCreateRepository } from "./generic-create.repository";

export interface IUserAccountRepository
  extends IGenericCreateRepository<UserAccount> {
  findByUserId(consumer_id: string): Promise<UserAccount | null>;
}
