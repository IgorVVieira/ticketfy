export interface IGenericCreateRepository<T> {
  create(entity: T): Promise<T>;
}
