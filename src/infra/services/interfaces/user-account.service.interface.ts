import { UserAccount } from '../../../domain/entities/users/user-account';
import { CreateUserAccountDto } from '../../dto/create-user-account.dto';

export interface IUserAccountServiceInterface {
  find(id: string): Promise<UserAccount | null>;
  findAll(userId: string): Promise<UserAccount[]>;
  create(userDto: CreateUserAccountDto): Promise<UserAccount>;
  decrementValue(
    userAccount: UserAccount,
    value: number
  ): Promise<UserAccount | null>;
}
