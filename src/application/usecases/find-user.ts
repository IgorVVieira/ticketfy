import { IUserRepository } from "../../domain/repositories/user.repository";

type User = {
  id: string;
  email: string;
  password: string;
};

export class FindUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(email: string): Promise<User> {
    const user = await this.userRepository.findBy("email", email);
    if (!user) throw new Error("User not found");

    return {
      id: user.getId(),
      email: user.getEmail(),
      password: user.getPassword(),
    };
  }
}
