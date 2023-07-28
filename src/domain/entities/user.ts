import { Entity } from "../../core/domain/Entity";

export type UserProps = {
  name: string;
  email: string;
  password: string;
  picture?: string;
};

export abstract class User extends Entity<UserProps> {
  private emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  constructor(props: UserProps, id?: string) {
    super(props, id);

    if (!this.isvalidEmail(props.email)) {
      throw new Error("Invalid email");
    }

    if (!this.isvalidPassword(props.password)) {
      throw new Error("Invalid password");
    }
  }

  private isvalidEmail(email: string): boolean {
    return this.emailRegex.test(email);
  }

  private isvalidPassword(password: string): boolean {
    return this.passwordRegex.test(password);
  }
}
