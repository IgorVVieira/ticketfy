import { Router } from "express";
import { AppDataSource } from "./infra/database/data-source";
import { UserDB } from "./infra/database/entities/user";
import { AuthController } from "./infra/controllers/auth.controller";
import { Login } from "./application/usecases/login";
import { UserRepository } from "./infra/database/repositories/user.repository";
import { JwtService } from "./infra/jwt/jwt.service";

const authController = new AuthController(
  new Login(
    new UserRepository(AppDataSource.getRepository(UserDB)),
    new JwtService()
  )
);

const router = Router();

router.post("/login", authController.login);

export default router;
