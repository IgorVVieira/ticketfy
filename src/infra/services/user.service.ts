import { CreateUser } from "../../application/usecases/create-user";
import { FindUser } from "../../application/usecases/find-user";
import { UpdateUserPicture } from "../../application/usecases/update-user-picture";
import { User } from "../../domain/entities/user";
import { CreateUserDto } from "../dto/create-user.dto";

export class UserService {
  constructor(
    private readonly createUser: CreateUser,
    private readonly findUser: FindUser,
    private readonly updateUser: UpdateUserPicture,
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
