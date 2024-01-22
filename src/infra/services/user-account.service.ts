import { inject, injectable } from 'inversify';

import { CreateUserAccount } from '../../application/usecases/user/create-user-account';
import { DecrementUserAccountValue } from '../../application/usecases/user/decrement-user-account-value';
import { FindUserAccount } from '../../application/usecases/user/find-user-account';
import { GetAllUserAccounts } from '../../application/usecases/user/get-all-user-accounts';
import BusinessError from '../../core/domain/business-error';
import { UserAccount } from '../../domain/entities/users/user-account';
import { CreateUserAccountDto } from '../dto/create-user-account.dto';
import { UserService } from './user.service';
import { TYPES } from '../shared/types';

@injectable()
export class UserAccountService {
  constructor(
    private readonly createUserAccount: CreateUserAccount,
    private readonly findUserAccount: FindUserAccount,
    private readonly getAllUserAccounts: GetAllUserAccounts,
    private readonly decrementUserAccountValue: DecrementUserAccountValue,
    @inject(TYPES.UserService) private readonly userService: UserService
  ) {
  }

  async find(id: string): Promise<UserAccount | null> {
    return this.findUserAccount.execute(id);
  }

  async findAll(userId: string): Promise<UserAccount[]> {
    return this.getAllUserAccounts.execute(userId);
  }

  async create(userDto: CreateUserAccountDto): Promise<UserAccount> {
    const user = await this.userService.findById('id', userDto.userId);
    if (!user) throw new BusinessError('User not found');
    return this.createUserAccount.execute(user, userDto);
  }

  async decrementValue(
    userAccount: UserAccount,
    value: number
  ): Promise<UserAccount | null> {
    return this.decrementUserAccountValue.execute(userAccount, value);
  }
}
