import { UserPermission } from "../../../../domain/entities/permissions/user-permission";
import { IUserPermissionRepository } from "../../../../domain/repositories/users/user-permission.repository";
import { FindUserPermission } from "../../permission/find-user-permission";

const mockUserPermissionRepository: IUserPermissionRepository = {
  create: jest.fn(),
  findByUseridAndPermissionId: jest.fn(),
  findByUserIdAndName: jest.fn(),
};

describe("FindUserPermission", () => {
  let findUserPermission: FindUserPermission;

  beforeEach(() => {
    findUserPermission = new FindUserPermission(mockUserPermissionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the user permission when found by user ID and name", async () => {
    const userId = "user123";
    const name = "permission_name";

    const mockUserPermission = UserPermission.create({
      id: "1",
      userId: userId,
      permissionId: "permission123",
    });

    (
      mockUserPermissionRepository.findByUserIdAndName as jest.Mock
    ).mockResolvedValue(mockUserPermission);

    const result = await findUserPermission.execute(userId, name);

    expect(result).toEqual(mockUserPermission);
    expect(
      mockUserPermissionRepository.findByUserIdAndName
    ).toHaveBeenCalledWith(userId, name);
    expect(
      mockUserPermissionRepository.findByUserIdAndName
    ).toHaveBeenCalledTimes(1);
  });

  it("should throw an error when the user permission is not found by user ID and name", async () => {
    const userId = "user123";
    const name = "permission_name";

    (
      mockUserPermissionRepository.findByUserIdAndName as jest.Mock
    ).mockResolvedValue(null);

    await expect(findUserPermission.execute(userId, name)).rejects.toThrowError(
      "Permission not found"
    );
    expect(
      mockUserPermissionRepository.findByUserIdAndName
    ).toHaveBeenCalledWith(userId, name);
    expect(
      mockUserPermissionRepository.findByUserIdAndName
    ).toHaveBeenCalledTimes(1);
  });
});
