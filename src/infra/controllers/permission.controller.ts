import { PermissionService } from "../services/permission.service";
import { Request, Response } from "express";

export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description } = req.body;
      const permission = await this.permissionService.create(name, description);
      return res.status(201).json(permission);
    } catch (error: any) {
      if (error.message === "Permission already exists") {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
