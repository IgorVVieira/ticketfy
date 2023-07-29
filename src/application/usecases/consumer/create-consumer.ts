import { Consumer } from "../../../domain/entities/consumer/consumer";
import { UserProps } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/repositories/user.repository";

export class CreateConsumer {
  constructor(private readonly consumerRepository: IUserRepository) {}

  async execute(input: UserProps) {
    let consumer = await this.consumerRepository.findBy("email", input.email);
    if (consumer) {
      throw new Error("Email already in use");
    }

    consumer = Consumer.create(input);
    return this.consumerRepository.create(consumer);
  }
}
