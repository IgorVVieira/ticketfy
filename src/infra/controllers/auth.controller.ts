import { FindUser } from "../../application/usecases/find-user";
import { JwtService } from "../jwt";
import { Request, Response } from "express";

export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly findUser: FindUser
  ) {}

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await this.findUser.execute(email);
      const isValidPassword = this.jwtService.isValidPassword(
        password,
        user.password
      );

      if (!isValidPassword) {
        return res.status(401).json({ message: "Password does not match" });
      }
      const token = this.jwtService.generateToken(user.id);

      return res.json({ token });
    } catch (error: any) {
      if (error.mesaage === "User not found") {
        return res.status(404).json({ message: error.message });
      }
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
