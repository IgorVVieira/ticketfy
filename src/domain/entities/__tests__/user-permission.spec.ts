import { UserPermission } from "../permission/user-permission";

describe("UserPermission", () => {
  it("should create a valid user permission", () => {
    const userPermission = UserPermission.create({
      userId: "1",
      permissionId: "1",
    });

    expect(userPermission).toBeTruthy();
    expect(userPermission.userId).toBe("1");
    expect(userPermission.permissionId).toBe("1");
  });
});
