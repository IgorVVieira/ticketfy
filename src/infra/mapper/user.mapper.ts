import { User } from '../../domain/entities/users/user';
import { UserDB } from '../database/entities/user';

export class UserMapper {
  static toDomain(userDB: UserDB): User {
    return User.create({
      id: userDB.id,
      name: userDB.name,
      email: userDB.email,
      password: userDB.password,
      picture: userDB.picture
    });
  }

  static toPersistence(user: User): UserDB {
    const userDB = new UserDB();
    userDB.id = user.getId();
    userDB.name = user.name;
    userDB.email = user.email;
    userDB.password = user.password;
    userDB.picture = user.getPicture();
    return userDB;
  }
}
