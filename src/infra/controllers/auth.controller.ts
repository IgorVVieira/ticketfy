import { Request, Response } from "express";
import { Login } from "../../application/usecases/login";

export class AuthController {
  constructor(private readonly loginUseCase: Login) {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await this.loginUseCase.execute(email, password);

      return res.json({ token });
    } catch (error: any) {
      if (
        error.mesaage === "User not found" ||
        error.message === "Password does not match"
      ) {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Token not found" });
      }
      // this.jwtService.blacklistToken(token);
      return res.json({ message: "Logout successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
