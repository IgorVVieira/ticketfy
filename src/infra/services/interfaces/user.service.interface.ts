import { User } from '../../../domain/entities/users/user';
import { CreateUserDto } from '../../dto/create-user.dto';

export interface IUserServiceInterface {
  create(userDto: CreateUserDto): Promise<User>;
  update(id: string, picture: string): Promise<User>
  findById(key: string, value: string): Promise<User>;
}
