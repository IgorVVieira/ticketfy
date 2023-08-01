import { Request, Response } from "express";
import { UserAccountService } from "../services/user-account.service";

export class UserAccountController {
  constructor(private readonly userAccountService: UserAccountService) {
    this.find = this.find.bind(this);
    this.findAll = this.findAll.bind(this);
    this.create = this.create.bind(this);
  }

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const userAccount = await this.userAccountService.find(req.params.userId);
      return res.status(200).json(userAccount);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const userAccounts = await this.userAccountService.findAll(req.userId);
      return res.status(200).json(userAccounts);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const userAccount = await this.userAccountService.create(req.body);
      return res.status(201).json(userAccount);
    } catch (error: any) {
      if (error.message === "User not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: error.message });
    }
  }
}
