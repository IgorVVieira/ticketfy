import {
  ConsumerAccount,
  ConsumerAccountProps,
} from "../../domain/entities/consumer/consumer-accounts";
import { IConsumerAccountRepository } from "../../domain/repositories/consumer-account.repository";

export class CreateConsumerAccount {
  constructor(
    private readonly consumerAccountRepo: IConsumerAccountRepository
  ) {}

  async execute(input: ConsumerAccountProps): Promise<ConsumerAccount> {
    const consumerAccount = ConsumerAccount.create(input);
    return this.consumerAccountRepo.create(consumerAccount);
  }
}
