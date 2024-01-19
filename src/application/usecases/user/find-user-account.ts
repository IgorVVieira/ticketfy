import { IUserAccountRepository } from '../../../domain/repositories/users/user-account.repository';

export class FindUserAccount {
  constructor(private readonly userAccountRepository: IUserAccountRepository) { }

  async execute(id: string) {
    return this.userAccountRepository.findById(id);
  }
}
