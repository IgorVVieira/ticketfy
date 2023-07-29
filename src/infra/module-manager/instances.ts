import { FindUser } from "../../application/usecases/find-user";
import { JwtService } from "../jwt";
import moduleManager from ".";
import { AuthController } from "../controllers/auth.controller";

const findUser = moduleManager.addSingleton<FindUser>(FindUser);
export const authController = moduleManager.addSingleton<AuthController>(
  AuthController,
  JwtService,
  findUser
);
