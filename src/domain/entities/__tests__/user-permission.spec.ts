import { UserPermission } from "../permissions/user-permission";

describe("UserPermission", () => {
  it("should create a valid user permission", () => {
    const userPermission = UserPermission.create({
      user_id: "1",
      permission_id: "1",
    });

    expect(userPermission).toBeTruthy();
    expect(userPermission.userId).toBe("1");
    expect(userPermission.permissionId).toBe("1");
  });
});
