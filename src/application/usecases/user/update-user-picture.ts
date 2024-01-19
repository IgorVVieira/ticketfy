import BusinessError from '../../../core/domain/business-error';
import { User } from '../../../domain/entities/users/user';
import { IUserRepository } from '../../../domain/repositories/users/user.repository';

export class UpdateUserPicture {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(userId: string, picture: string): Promise<User> {
    const user = await this.userRepository.findBy('id', userId);
    if (!user) {
      throw new BusinessError('User not found');
    }

    user.updatePicture(picture);
    return this.userRepository.update(user.getId(), user);
  }
}
