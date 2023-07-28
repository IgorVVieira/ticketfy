import { ConsumerAccount } from "../../domain/entities/consumer/consumer-accounts";
import { IConsumerAccountRepository } from "../../domain/repositories/consumer-account.repository";
import { PaymentEnum } from "../../domain/entities/payment-enum";

type CreateConsumerAccountProps = {
  consumer_id: string;
  name: string;
  amount: number;
  type: string;
};

export class CreateConsumerAccount {
  constructor(
    private readonly consumerAccountRepo: IConsumerAccountRepository
  ) {}

  async execute(input: CreateConsumerAccountProps): Promise<ConsumerAccount> {
    const consumerAccount = ConsumerAccount.create({
      ...input,
      type: PaymentEnum[input.type as keyof typeof PaymentEnum],
    });

    return this.consumerAccountRepo.create(consumerAccount);
  }
}
