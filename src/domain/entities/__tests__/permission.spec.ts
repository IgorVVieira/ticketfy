import { Permission } from "../permission/permission";

describe("Permission", () => {
  it("should create a valid permission", () => {
    const permission = Permission.create({
      name: "ADMIN",
      description: "Administrador",
    });

    expect(permission).toBeTruthy();
    expect(permission.name).toBe("ADMIN");
    expect(permission.description).toBe("Administrador");
  });
});
