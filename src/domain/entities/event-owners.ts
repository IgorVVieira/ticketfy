import { User, UserProps } from "./user";

export enum EventOwnerType {
  EMPRESA = "empresa",
  UNIVERSIDADE = "universidade",
}

export class EventOwner extends User {
  private constructor(
    props: UserProps,
    private type: EventOwnerType,
    id?: string
  ) {
    super(props, id);
  }

  static create(
    props: UserProps,
    type: EventOwnerType,
    id?: string
  ): EventOwner {
    return new EventOwner(props, type, id);
  }

  public getType(): EventOwnerType {
    return this.type;
  }
}
