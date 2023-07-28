import { ConsumerAccount } from "../entities/consumer-accounts";
import { IGenericCreateRepository } from "./generic-create.repository";

export interface IConsumerAccountRepository
  extends IGenericCreateRepository<ConsumerAccount> {
  findByConsumerId(consumer_id: string): Promise<ConsumerAccount | null>;
}
