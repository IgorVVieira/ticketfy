import { Router } from "express";
import { AppDataSource } from "./infra/database/data-source";
import { UserDB } from "./infra/database/entities/user";
import { AuthController } from "./infra/controllers/auth.controller";
import { Login } from "./application/usecases/login";
import { UserRepository } from "./infra/database/repositories/user.repository";
import { JwtService } from "./infra/jwt/jwt.service";
import { UserController } from "./infra/controllers/user.controller";
import { CreateUser } from "./application/usecases/create-user";
import { FindUser } from "./application/usecases/find-user";
import { UpdateUserPicture } from "./application/usecases/update-user-picture";
import { authMiddleware } from "./infra/middlewares/auth.middleware";
import { UserService } from "./infra/services/user.service";

const userDb = AppDataSource.getRepository(UserDB);
const userRepository = new UserRepository(userDb);

const authController = new AuthController(
  new Login(userRepository, new JwtService())
);

const userController = new UserController(
  new UserService(
    new CreateUser(userRepository),
    new FindUser(userRepository),
    new UpdateUserPicture(userRepository)
  )
);

const router = Router();

router.post("/login", authController.login);
router.post("/users", userController.create);
router.get("/users/:id", authMiddleware, userController.findById);

export default router;
