import { Repository } from "typeorm";
import { UserAccount } from "../../../domain/entities/user/user-account";
import { IUserAccountRepository } from "../../../domain/repositories/user-account.repository";
import { UserAccountDB } from "../entities/user-account";
import { UserAccountMapper } from "../../mapper/user-account.mapper";

export class UserAccountRepository implements IUserAccountRepository {
  constructor(private readonly repository: Repository<UserAccountDB>) {}

  async findByUserId(userId: string): Promise<UserAccount | null> {
    const userAccountDB = await this.repository.findOne({
      where: { user_id: userId },
    });
    if (!userAccountDB) return null;
    return UserAccountMapper.toDomain(userAccountDB);
  }

  async findById(id: string): Promise<UserAccount | null> {
    const userAccountDB = await this.repository.findOne({
      where: { id },
    });
    if (!userAccountDB) return null;
    return UserAccountMapper.toDomain(userAccountDB);
  }

  async create(entity: UserAccount): Promise<UserAccount> {
    const userAccountDB = UserAccountMapper.toPersistence(entity);
    const createdUserAccount = this.repository.create(userAccountDB);
    await this.repository.save(createdUserAccount);

    return UserAccountMapper.toDomain(createdUserAccount);
  }
}
