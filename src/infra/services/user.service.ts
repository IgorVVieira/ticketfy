import { injectable } from 'inversify';

// import { CreateUser } from '../../application/usecases/user/create-user';
import { FindUser } from '../../application/usecases/user/find-user';
import { UpdateUserPicture } from '../../application/usecases/user/update-user-picture';
import { User } from '../../domain/entities/users/user';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUserServiceInterface } from './interfaces/user.service.interface';
import { CreateUser } from '../../application/usecases/user/create-user';

@injectable()
export class UserService implements IUserServiceInterface {
  constructor(
    private readonly createUser: CreateUser,
    private readonly findUser: FindUser,
    private readonly updateUser: UpdateUserPicture
  ) {
  }

  async create(userDto: CreateUserDto): Promise<User> {
    return this.createUser.execute(userDto);
  }

  async update(id: string, picture: string): Promise<User> {
    return this.updateUser.execute(id, picture);
  }

  async findById(key: string, value: string): Promise<User> {
    return this.findUser.execute(key, value);
  }
}
