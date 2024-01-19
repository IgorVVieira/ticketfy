import { Permission } from '../../../../domain/entities/permissions/permission';
import { IPermissionRepository } from '../../../../domain/repositories/permission.repository';
import { FindPermission } from '../../permission/find-permission';

const mockPermissionRepository: IPermissionRepository = {
  create: jest.fn(),
  findBy: jest.fn()
};

describe('FindPermission', () => {
  let findPermission: FindPermission;

  beforeEach(() => {
    findPermission = new FindPermission(mockPermissionRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the permission when found', async () => {
    const key = 'example_key';
    const value = 'example_value';
    const mockPermission = Permission.create({
      id: '1',
      name: 'example_name'
    });

    (mockPermissionRepository.findBy as jest.Mock).mockResolvedValue(
      mockPermission
    );

    const result = await findPermission.execute(key, value);

    expect(result).toEqual(mockPermission);
    expect(mockPermissionRepository.findBy).toHaveBeenCalledWith(key, value);
    expect(mockPermissionRepository.findBy).toHaveBeenCalledTimes(1);
  });

  it('should throw an error when the permission is not found', async () => {
    const key = 'example_key';
    const value = 'example_value';

    (mockPermissionRepository.findBy as jest.Mock).mockResolvedValue(null);

    await expect(findPermission.execute(key, value)).rejects.toThrowError(
      'Permission not found'
    );
    expect(mockPermissionRepository.findBy).toHaveBeenCalledWith(key, value);
    expect(mockPermissionRepository.findBy).toHaveBeenCalledTimes(1);
  });
});
