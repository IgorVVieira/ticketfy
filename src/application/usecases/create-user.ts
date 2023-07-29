import { User, UserProps } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/user.repository";

export class CreateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UserProps): Promise<User> {
    let user = await this.userRepository.findBy("email", input.email);
    if (user) {
      throw new Error("Email already in use");
    }

    user = User.create({ ...input });
    return this.userRepository.create(user);
  }
}
