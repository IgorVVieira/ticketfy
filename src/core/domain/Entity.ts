import crypto from "crypto";

export abstract class Entity<T> {
  public readonly id: string;

  constructor(public readonly props: T, id?: string) {
    this.id = id ?? crypto.randomUUID();
  }
}
