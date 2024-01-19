import { User } from '../../entities/users/user';
import { IGenericCreateRepository } from '../generic-create.repository';

export interface IUserRepository extends IGenericCreateRepository<User> {
  findBy(key: string, value: string): Promise<User | null>;
  update(id: string, user: User): Promise<User>;
}
