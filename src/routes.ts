import { Router } from "express";
import { authController } from "./infra/module-manager/instances";

const router = Router();

// router.get("/users", authMiddleware, UserController.index);
// router.post("/users", UserController.store);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

export default router;
