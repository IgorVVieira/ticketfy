import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/user.repository";

export class FindUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findBy("email", email);
    if (!user) throw new Error("User not found");

    return user;
  }
}
