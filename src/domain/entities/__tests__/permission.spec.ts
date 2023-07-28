import { Permission } from "../permission";

describe("Permission", () => {
  it("should create a valid permission", () => {
    const permission = Permission.create({
      name: "ADMIN",
      description: "Administrador",
    });

    expect(permission).toBeTruthy();
    expect(permission.props.name).toBe("ADMIN");
    expect(permission.props.description).toBe("Administrador");
  });
});
