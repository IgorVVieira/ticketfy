import { Consumer } from "../../../domain/entities/consumer/consumer";
import { IUserRepository } from "../../../domain/repositories/user.repository";

export class UpdateConsumerPicture {
  constructor(private readonly consumerRepository: IUserRepository) {}

  async execute(consumerId: string, picture: string): Promise<Consumer> {
    let consumer = await this.consumerRepository.findBy("id", consumerId);

    if (!consumer) {
      throw new Error("Consumer not found");
    }

    consumer.props.picture = picture;
    return this.consumerRepository.update(consumer.getId(), consumer);
  }
}
