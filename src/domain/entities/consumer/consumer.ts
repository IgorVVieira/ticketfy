import { User, UserProps } from "../user";

export class Consumer extends User {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static create(props: UserProps, id?: string): Consumer {
    return new Consumer(props, id);
  }
}
