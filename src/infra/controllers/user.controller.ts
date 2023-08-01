import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  constructor(private readonly userService: UserService) {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.findById = this.findById.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;
      const user = await this.userService.create({ name, email, password });
      return res.status(201).json(user);
    } catch (error: any) {
      if (error.message === "Email already in use") {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { picture } = req.body;
    const user = await this.userService.update(id, picture);
    return res.status(200).json(user);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await this.userService.findById("id", id);
      return res.status(200).json(user);
    } catch (error: any) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
