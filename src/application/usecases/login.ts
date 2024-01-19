import BusinessError from '../../core/domain/business-error';
import { IAuthRepository } from '../../domain/repositories/auth.repository';
import { IUserRepository } from '../../domain/repositories/users/user.repository';

export class Login {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authRepository: IAuthRepository
  ) { }

  async execute(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findBy('email', email);

    if (!user) {
      throw new BusinessError('User not found');
    }

    const isPasswordCorrect = await this.authRepository.isValidPassword(
      password,
      user.getPassword()
    );

    if (!isPasswordCorrect) {
      throw new BusinessError('Password does not match');
    }
    const token = this.authRepository.generateToken(user.getId());
    return token;
  }
}
