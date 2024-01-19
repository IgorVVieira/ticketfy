import { IAuthRepository } from '../../../domain/repositories/auth.repository';
import { IUserRepository } from '../../../domain/repositories/users/user.repository';
import { Login } from '../login';

const userRepositoryMock: IUserRepository = {
  findBy: jest.fn(),
  update: jest.fn(),
  create: jest.fn()
};

const authRepositoryMock: IAuthRepository = {
  isValidPassword: jest.fn(),
  generateToken: jest.fn()
};

const login = new Login(userRepositoryMock, authRepositoryMock);

describe('Login', () => {
  test('should return a valid token when logging in with correct email and password', async () => {
    (userRepositoryMock.findBy as jest.Mock).mockResolvedValue({
      getId: () => 'user_id',
      getPassword: () => 'hashed_password'
    });

    (authRepositoryMock.isValidPassword as jest.Mock).mockResolvedValue(true);
    (authRepositoryMock.generateToken as jest.Mock).mockReturnValue('generated_token');

    const token = await login.execute('user@example.com', 'password');

    expect(token).toBe('generated_token');

    expect(userRepositoryMock.findBy).toHaveBeenCalledWith(
      'email',
      'user@example.com'
    );

    expect(authRepositoryMock.isValidPassword).toHaveBeenCalledWith(
      'password',
      'hashed_password'
    );

    expect(authRepositoryMock.generateToken).toHaveBeenCalledWith('user_id');
  });

  test('should throw an error when logging in with an invalid email', async () => {
    (userRepositoryMock.findBy as jest.Mock).mockResolvedValue(null);

    await expect(
      login.execute('invalid_email@example.com', 'password')
    ).rejects.toThrow('User not found');

    expect(userRepositoryMock.findBy).toHaveBeenCalledWith(
      'email',
      'invalid_email@example.com'
    );
  });

  test('should throw an error when logging in with an incorrect password', async () => {
    (userRepositoryMock.findBy as jest.Mock).mockResolvedValue({
      getId: () => 'user_id',
      getPassword: () => 'hashed_password'
    });

    (authRepositoryMock.isValidPassword as jest.Mock).mockResolvedValue(false);

    await expect(
      login.execute('user@example.com', 'wrong_password')
    ).rejects.toThrow('Password does not match');

    expect(authRepositoryMock.isValidPassword).toHaveBeenCalledWith(
      'wrong_password',
      'hashed_password'
    );
  });
});
