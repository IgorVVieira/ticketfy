import { Permission } from "../permissions/permission";

describe("Permission", () => {
  it("should create a valid permission", () => {
    const permission = Permission.create({
      name: "admin",
      description: "Administrador",
    });

    expect(permission).toBeTruthy();
    expect(permission.name).toBe("admin");
    expect(permission.description).toBe("Administrador");
  });
});
