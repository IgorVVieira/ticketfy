import { Entity } from "../../../core/domain/Entity";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  picture?: string;
  type?: UserType;
  id?: string;
};

export enum UserType {
  EMPRESA = "empresa",
  UNIVERSIDADE = "universidade",
  COMPRADOR = "comprador",
}

export class User extends Entity {
  private emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    private picture?: string,
    public readonly type: UserType = UserType.COMPRADOR,
    id?: string
  ) {
    super(id);

    if (!this.isvalidEmail(email)) {
      throw new Error("Invalid email");
    }

    if (!this.isvalidPassword(password)) {
      throw new Error("Invalid password");
    }
  }

  static create({ name, email, password, picture, type, id }: UserProps): User {
    return new User(name, email, password, picture, type, id);
  }

  private isvalidEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }

  private isvalidPassword(password: string): boolean {
    return this.passwordRegex.test(password);
  }

  public getPassword(): string {
    return this.password;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPicture(): string | undefined {
    return this.picture;
  }

  public updatePicture(picture: string): void {
    this.picture = picture;
  }
}
