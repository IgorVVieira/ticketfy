export interface IAuthRepository {
  generateToken(userId: string): string;
  isValidPassword(password: string, hash: string): Promise<boolean>;
}
