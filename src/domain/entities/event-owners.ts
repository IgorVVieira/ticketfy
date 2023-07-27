import { Entity } from "../../core/domain/Entity";

export enum EventOwnerType {
  EMPRESA = "empresa",
  UNIVERSIDADE = "universidade",
}

type EventOwnerProps = {
  name: string;
  type: EventOwnerType;
};

export class EventOwner extends Entity<EventOwnerProps> {
  private constructor(props: EventOwnerProps, id?: string) {
    super(props, id);
  }

  static create(props: EventOwnerProps, id?: string): EventOwner {
    return new EventOwner(props, id);
  }
}
