import { UserAccount } from "../../domain/entities/users/user-account";
import { UserAccountDB } from "../database/entities/user-account";

export class UserAccountMapper {
  static toDomain(userAccountDB: UserAccountDB): UserAccount {
    return UserAccount.create({
      id: userAccountDB.id,
      user_id: userAccountDB.user_id,
      amount: userAccountDB.amount,
      name: userAccountDB.name,
      type: userAccountDB.paymentType,
    });
  }

  static toPersistence(userAccount: UserAccount): UserAccountDB {
    const userAccountDB = new UserAccountDB();
    userAccountDB.id = userAccount.getId();
    userAccountDB.user_id = userAccount.userId;
    userAccountDB.amount = userAccount.getAmount();
    userAccountDB.name = userAccount.name;
    userAccountDB.paymentType = userAccount.type;
    return userAccountDB;
  }
}
