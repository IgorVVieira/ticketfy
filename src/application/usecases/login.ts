import { IJwtRepository } from "../../domain/repositories/jwt.repository";
import { IUserRepository } from "../../domain/repositories/user.repository";

export class Login {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtRepository: IJwtRepository
  ) {}

  async execute(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findBy("email", email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordCorrect = this.jwtRepository.isValidPassword(
      password,
      user.getPassword()
    );

    if (!isPasswordCorrect) {
      throw new Error("Password does not match");
    }
    const token = this.jwtRepository.generateToken(user.getId());
    return token;
  }
}
