import { Consumer } from "../../domain/entities/user/consumer";
import {
  ConsumerAccount,
  ConsumerAccountProps,
} from "../../domain/entities/user/user-account";
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
