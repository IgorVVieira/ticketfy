import { UserAccount } from "../../../domain/entities/users/user-account";
import { IUserAccountRepository } from "../../../domain/repositories/users/user-account.repository";

export class DecrementUserAccountValue {
  constructor(private readonly UserAccountRepo: IUserAccountRepository) {}

  async execute(
    userAccount: UserAccount,
    value: number
  ): Promise<UserAccount | null> {
    userAccount.decrementAmount(value);
    const userAccountDb = await this.UserAccountRepo.update(
      userAccount.getId(),
      userAccount
    );
    return userAccountDb;
  }
}
