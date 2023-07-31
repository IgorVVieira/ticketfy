import { CreateUserAccount } from "../../application/usecases/create-user-account";
import { UserAccount } from "../../domain/entities/user/user-account";
import { CreateUserAccountDto } from "../dto/create-user-account.dto";
import { UserService } from "./user.service";

export class UserAccountService {
  constructor(
    private readonly createUserAccount: CreateUserAccount,
    private readonly userService: UserService
  ) {
    this.create = this.create.bind(this);
  }

  async create(userDto: CreateUserAccountDto): Promise<UserAccount> {
    const user = await this.userService.findById(userDto.user_id);
    if (!user) throw new Error("User not found");
    return this.createUserAccount.execute(user, userDto);
  }
}
