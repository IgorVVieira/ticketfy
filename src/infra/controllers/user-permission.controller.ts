import { UserPermissionService } from "../services/user-permission.service";
import { Request, Response } from "express";

export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { userId, permissionId } = req.body;
      const userPermission = await this.userPermissionService.create(
        userId,
        permissionId
      );
      return res.status(201).json(userPermission);
    } catch (error: any) {
      if (error.message === "User permission already exists") {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
