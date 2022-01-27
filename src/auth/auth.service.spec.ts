import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { BcryptService } from '../bcrypt/bcrypt.service';
import { SafeUserDto } from '../users/dto/safe-user-credentials.dto';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

let authService: AuthService;
let userService: UsersService;
let bcryptService: BcryptService;
const mockUserName = 'mockUserName';
const mockPassword = 'mockPassword';
const mockSafeUser = new SafeUserDto();
const mockAccessToken = 'mockAccessToken';

describe('AuthService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(() => {
              return Promise.resolve({
                username: mockUserName,
                password: mockPassword,
              });
            }),
            create: jest.fn(() => Promise.resolve()),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest
              .fn()
              .mockReturnValueOnce('mockUserName')
              .mockReturnValueOnce('mockPassword'),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mockAccessToken'),
          },
        },
        {
          provide: BcryptService,
          useValue: {
            compare: jest.fn(() => {
              return Promise.resolve(true);
            }),
            generateHash: jest.fn(() => {
              return Promise.resolve('mockHashedPassword');
            }),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    bcryptService = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return a Promise of a safe user dto', async () => {
      await expect(
        authService.validateUser(mockUserName, mockPassword),
      ).resolves.toEqual({
        username: mockUserName,
      });
      expect.assertions(1);
    });
    it('should return null because no user', async () => {
      userService.findOne = jest.fn(() => {
        return Promise.resolve(null);
      });
      await expect(
        authService.validateUser(mockUserName, mockPassword),
      ).resolves.toBeNull();
      expect.assertions(1);
    });
    it('should return null because passwords miss match', async () => {
      bcryptService.compare = jest.fn(() => {
        return Promise.resolve(false);
      });
      await expect(
        authService.validateUser(mockUserName, mockPassword),
      ).resolves.toBeNull();
      expect.assertions(1);
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(authService, 'validateUser');
      await authService.validateUser(mockUserName, mockPassword);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('signIn', () => {
    it('should return an auth token', () => {
      expect(authService.signIn(mockSafeUser)).toEqual({
        access_token: mockAccessToken,
      });
    });
    it('should be executed once', () => {
      const spy = jest.spyOn(authService, 'signIn');
      authService.signIn(mockSafeUser);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('signUp', () => {
    it('should return a promise of void', async () => {
      await expect(authService.signUp()).resolves.toBeUndefined();
      expect.assertions(1);
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(authService, 'signUp');
      await authService.signUp();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });
});

describe('AuthService errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(() => {
              return Promise.reject(new Error());
            }),
            create: jest.fn(() => {
              throw new Error();
            }),
          },
        },
        {
          provide: ConfigService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => {
              throw new Error();
            }),
          },
        },
        {
          provide: BcryptService,
          useValue: {
            compare: jest.fn(() => {
              return Promise.reject(new Error());
            }),
            generateHash: jest.fn(() => {
              return Promise.reject(new Error());
            }),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    bcryptService = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser with error', () => {
    it('should thorw an error', async () => {
      userService.findOne = jest.fn(() => {
        return Promise.resolve({
          username: mockUserName,
          password: mockPassword,
        }) as Promise<User>;
      });
      await expect(
        authService.validateUser(mockUserName, mockPassword),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
    it('should throw an error', async () => {
      bcryptService.compare = jest.fn(() => {
        return Promise.reject(new Error());
      });
      await expect(
        authService.validateUser(mockUserName, mockPassword),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('signIn with error', () => {
    it('should throw an error', () => {
      expect(() => authService.signIn(mockSafeUser)).toThrowError();
    });
  });

  describe('signUp with error', () => {
    it('should throw an error', async () => {
      await expect(authService.signUp()).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
