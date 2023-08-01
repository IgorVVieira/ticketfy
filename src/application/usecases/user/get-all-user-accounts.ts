import { IUserAccountRepository } from "../../../domain/repositories/users/user-account.repository";

export class GetAllUserAccounts {
  constructor(private readonly userAccountRepository: IUserAccountRepository) {}

  async execute(userId: string) {
    return this.userAccountRepository.findAll(userId);
  }
}
