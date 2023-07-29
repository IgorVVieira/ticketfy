import { Router } from "express";
import { AuthController } from "./infra/controllers/auth.controller";

const router = Router();

// router.get("/users", authMiddleware, UserController.index);
// router.post("/users", UserController.store);
// router.get("/login", AuthController.authenticate);

export default router;
