import { Permission } from "../../../../domain/entities/permissions/permission";
import { IPermissionRepository } from "../../../../domain/repositories/permission.repository";
import { CreatePermission } from "../../permission/create-permission";

const mockPermissionRepository: IPermissionRepository = {
  create: jest.fn(),
  findBy: jest.fn(),
};

describe("CreatePermission", () => {
  let createPermission: CreatePermission;

  beforeEach(() => {
    createPermission = new CreatePermission(mockPermissionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new permission successfully", async () => {
    const permissionInput = {
      id: "1",
      name: "admin",
      description: "Admin permission",
    };

    (mockPermissionRepository.findBy as jest.Mock).mockResolvedValueOnce(null);

    const mockCreatedPermission = Permission.create(permissionInput);

    (mockPermissionRepository.create as jest.Mock).mockResolvedValueOnce(
      mockCreatedPermission
    );

    const permission = await createPermission.execute(permissionInput);

    expect(mockPermissionRepository.findBy).toHaveBeenCalledWith(
      "name",
      "admin"
    );

    expect(mockPermissionRepository.create).toHaveBeenCalledWith(
      mockCreatedPermission
    );

    expect(permission).toEqual(mockCreatedPermission);
  });

  it("should throw an error when permission already exists", async () => {
    const permissionInput = {
      name: "read",
      description: "Read permission",
    };

    const existingPermission = Permission.create(permissionInput);

    (mockPermissionRepository.findBy as jest.Mock).mockResolvedValueOnce(
      existingPermission
    );

    await expect(
      createPermission.execute(permissionInput)
    ).rejects.toThrowError("Permission already exists");

    expect(mockPermissionRepository.findBy).toHaveBeenCalledWith(
      "name",
      "read"
    );

    expect(mockPermissionRepository.create).not.toHaveBeenCalled();
  });
});
