import { CreateUserAccount } from "../../application/usecases/user/create-user-account";
import { DecrementUserAccountValue } from "../../application/usecases/user/decrement-user-account-value";
import { FindUserAccount } from "../../application/usecases/user/find-user-account";
import { UserAccount } from "../../domain/entities/users/user-account";
import { CreateUserAccountDto } from "../dto/create-user-account.dto";
import { UserService } from "./user.service";

export class UserAccountService {
  constructor(
    private readonly createUserAccount: CreateUserAccount,
    private readonly findUserAccount: FindUserAccount,
    private readonly decrementUserAccountValue: DecrementUserAccountValue,
    private readonly userService: UserService
  ) {
    this.find = this.find.bind(this);
    this.create = this.create.bind(this);
    this.decrementValue = this.decrementValue.bind(this);
  }

  async find(id: string, userId: string): Promise<UserAccount | null> {
    const userAccount = await this.findUserAccount.execute(id);
    if (userAccount?.userId !== userId) throw new Error("Unauthorized");
    return userAccount;
  }

  async create(userDto: CreateUserAccountDto): Promise<UserAccount> {
    const user = await this.userService.findById(userDto.user_id);
    if (!user) throw new Error("User not found");
    return this.createUserAccount.execute(user, userDto);
  }

  async decrementValue(
    userAccount: UserAccount,
    value: number
  ): Promise<UserAccount | null> {
    return this.decrementUserAccountValue.execute(userAccount, value);
  }
}
