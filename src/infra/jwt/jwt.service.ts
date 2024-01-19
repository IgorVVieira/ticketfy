import { IAuthRepository } from '../../domain/repositories/auth.repository';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import BusinessError from '../../core/domain/business-error';

export class JwtService implements IAuthRepository {
  generateToken(userId: string): string {
    return jwt.sign({ id: userId }, 'secret', {
      expiresIn: '1d'
    });
  }

  async isValidPassword(password: string, hash: string): Promise<boolean> {
    return await bcryptjs.compare(password, hash);
  }

  logout(): void {
    throw new BusinessError('Method not implemented.');
  }
}
