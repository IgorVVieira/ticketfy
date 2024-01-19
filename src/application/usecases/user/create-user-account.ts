import { User } from '../../../domain/entities/users/user';
import {
  UserAccount,
  UserAccountProps
} from '../../../domain/entities/users/user-account';
import { IUserAccountRepository } from '../../../domain/repositories/users/user-account.repository';

export class CreateUserAccount {
  constructor(private readonly UserAccountRepo: IUserAccountRepository) { }

  async execute(user: User, input: UserAccountProps): Promise<UserAccount> {
    input.userId = user.getId();
    const userAccount = UserAccount.create(input);
    return this.UserAccountRepo.create(userAccount);
  }
}
