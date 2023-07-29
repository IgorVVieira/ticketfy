import { Consumer } from "../../domain/entities/consumer/consumer";
import {
  ConsumerAccount,
  ConsumerAccountProps,
} from "../../domain/entities/consumer/consumer-accounts";
import { IConsumerAccountRepository } from "../../domain/repositories/consumer-account.repository";

export class CreateConsumerAccount {
  constructor(
    private readonly consumerAccountRepo: IConsumerAccountRepository
  ) {}

  async execute(
    consumer: Consumer,
    input: ConsumerAccountProps
  ): Promise<ConsumerAccount> {
    input.consumer_id = consumer.getId();
    const consumerAccount = ConsumerAccount.create(input);
    return this.consumerAccountRepo.create(consumerAccount);
  }
}
