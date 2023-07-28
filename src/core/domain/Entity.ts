import crypto from "crypto";

export abstract class Entity<T> {
  protected readonly id: string;

  constructor(public readonly props: T, id?: string) {
    this.id = id ?? crypto.randomUUID();
  }

  public getId(): string {
    return this.id;
  }
}
