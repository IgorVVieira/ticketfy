import { ConsumerAccount } from "../entities/user/user-account";
import { IGenericCreateRepository } from "./generic-create.repository";

export interface IConsumerAccountRepository
  extends IGenericCreateRepository<ConsumerAccount> {
  findByConsumerId(consumer_id: string): Promise<ConsumerAccount | null>;
}
