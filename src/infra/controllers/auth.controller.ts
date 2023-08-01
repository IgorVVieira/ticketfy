import { Request, Response } from "express";
import { Login } from "../../application/usecases/login";

export class AuthController {
  constructor(private readonly loginUseCase: Login) {
    this.login = this.login.bind(this);
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.loginUseCase.execute(email, password);

      return res.json({ token });
    } catch (error: any) {
      if (error.message === "Password does not match") {
        return res.status(409).json({ message: error.message });
      }
      if (error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
