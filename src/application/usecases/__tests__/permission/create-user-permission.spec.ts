import { IUserPermissionRepository } from "../../../../domain/repositories/users/user-permission.repository";
import { User } from "../../../../domain/entities/users/user";
import { Permission } from "../../../../domain/entities/permissions/permission";
import { UserPermission } from "../../../../domain/entities/permissions/user-permission";
import { CreateUserPermission } from "../../permission/create-user-permission";

const mockUserPermissionRepository: IUserPermissionRepository = {
  create: jest.fn(),
  findByUseridAndPermissionId: jest.fn(),
  findByUserIdAndName: jest.fn(),
};

describe("CreateUserPermission", () => {
  let createUserPermission: CreateUserPermission;

  beforeEach(() => {
    createUserPermission = new CreateUserPermission(
      mockUserPermissionRepository
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user permission successfully", async () => {
    const user = User.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "SecurePasswor!d123",
    });

    const permission = Permission.create({
      name: "admin",
      description: "Admin permission",
    });

    (
      mockUserPermissionRepository.findByUseridAndPermissionId as jest.Mock
    ).mockResolvedValueOnce(null);

    const mockCreatedUserPermission = UserPermission.create({
      id: "mockId",
      userId: user.getId(),
      permissionId: permission.getId(),
    });

    (mockUserPermissionRepository.create as jest.Mock).mockResolvedValueOnce(
      mockCreatedUserPermission
    );

    const userPermission = await createUserPermission.execute(user, permission);

    expect(
      mockUserPermissionRepository.findByUseridAndPermissionId
    ).toHaveBeenCalledWith(user.getId(), permission.getId());

    const userPermissionWithoutId = { ...userPermission, id: undefined };
    const mockCreatedUserPermissionWithoutId = {
      ...mockCreatedUserPermission,
      id: undefined,
    };

    expect(userPermissionWithoutId).toEqual(mockCreatedUserPermissionWithoutId);
  });

  it("should throw an error when user permission already exists", async () => {
    const user = User.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "SecurePassword123",
    });

    const permission = Permission.create({
      name: "read",
      description: "Read permission",
    });

    const existingUserPermission = UserPermission.create({
      userId: user.getId(),
      permissionId: permission.getId(),
    });

    (
      mockUserPermissionRepository.findByUseridAndPermissionId as jest.Mock
    ).mockResolvedValueOnce(existingUserPermission);

    await expect(
      createUserPermission.execute(user, permission)
    ).rejects.toThrowError("Permission already exists");

    expect(
      mockUserPermissionRepository.findByUseridAndPermissionId
    ).toHaveBeenCalledWith(user.getId(), permission.getId());

    expect(mockUserPermissionRepository.create).not.toHaveBeenCalled();
  });
});
