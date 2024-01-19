import { UserAccount } from '../../entities/users/user-account';
import { IGenericCreateRepository } from '../generic-create.repository';

export interface IUserAccountRepository
  extends IGenericCreateRepository<UserAccount> {
  findByUserId(userId: string): Promise<UserAccount | null>;
  findById(id: string): Promise<UserAccount | null>;
  findAll(userId: string): Promise<UserAccount[]>;
  update(id: string, userAccount: UserAccount): Promise<UserAccount | null>;
}
