import { User } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/user.repository";

export class UpdateUserPicture {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: string, picture: string): Promise<User> {
    let user = await this.userRepository.findBy("id", userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.updatePicture(picture);
    return this.userRepository.update(user.getId(), user);
  }
}
