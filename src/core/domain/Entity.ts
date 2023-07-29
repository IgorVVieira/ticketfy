import crypto from "crypto";

export abstract class Entity {
  protected readonly id: string;

  constructor(id?: string) {
    this.id = id ?? crypto.randomUUID();
  }

  public getId(): string {
    return this.id;
  }
}
