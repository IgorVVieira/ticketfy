import { CreateUser } from "../../application/usecases/user/create-user";
import { FindUser } from "../../application/usecases/user/find-user";
import { UpdateUserPicture } from "../../application/usecases/user/update-user-picture";
import { User } from "../../domain/entities/users/user";
import { CreateUserDto } from "../dto/create-user.dto";

export class UserService {
  constructor(
    private readonly createUser: CreateUser,
    private readonly findUser: FindUser,
    private readonly updateUser: UpdateUserPicture
  ) {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.findById = this.findById.bind(this);
  }

  async create(userDto: CreateUserDto): Promise<User> {
    return this.createUser.execute(userDto);
  }

  async update(id: string, picture: string): Promise<User> {
    return this.updateUser.execute(id, picture);
  }

  async findById(id: string): Promise<User> {
    return this.findUser.execute(id);
  }
}
