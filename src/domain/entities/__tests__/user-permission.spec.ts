import { UserPermission } from "../user-permission";

describe("UserPermission", () => {
  it("should create a valid user permission", () => {
    const userPermission = UserPermission.create({
      user_id: "1",
      permission_id: "1",
    });

    expect(userPermission).toBeTruthy();
    expect(userPermission.props.user_id).toBe("1");
    expect(userPermission.props.permission_id).toBe("1");
  });
});
