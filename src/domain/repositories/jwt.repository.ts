export interface IJwtRepository {
  generateToken(payload: string): string;
  isValidPassword(password: string, hash: string): boolean;
  verifyToken(token: string): object;
}
