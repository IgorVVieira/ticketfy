import { Repository } from "typeorm";
import { User } from "../../../domain/entities/user";
import { IUserRepository } from "../../../domain/repositories/user.repository";
import { UserMapper } from "../../mapper/user.mapper";
import { UserDB } from "../entities/user";

export class UserRepository implements IUserRepository {
  constructor(private readonly repository: Repository<UserDB>) {}

  async findBy(key: string, value: string): Promise<User | null> {
    const userDB = await this.repository.findOne({ where: { [key]: value } });
    if (!userDB) return null;
    return UserMapper.toDomain(userDB);
  }

  async update(id: string, user: User): Promise<User> {
    const userDB = UserMapper.toPersistence(user);
    await this.repository.update(id, userDB);
    return UserMapper.toDomain(userDB);
  }

  async create(entity: User): Promise<User> {
    const userDB = UserMapper.toPersistence(entity);
    const createdUser = this.repository.create(userDB);
    await this.repository.save(createdUser);
    return UserMapper.toDomain(createdUser);
  }
}
