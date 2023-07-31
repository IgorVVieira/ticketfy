import { UserAccount } from "../entities/user/user-account";
import { IGenericCreateRepository } from "./generic-create.repository";

export interface IUserAccountRepository
  extends IGenericCreateRepository<UserAccount> {
  findByConsumerId(consumer_id: string): Promise<UserAccount | null>;
}
