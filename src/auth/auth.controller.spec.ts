import { getMockReq, getMockRes } from '@jest-mock/express';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { SafeUserDto } from '../users/dto/safe-user-credentials.dto';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRequest } from './interfaces/auth-request.interface';
import { AuthToken } from './interfaces/auth-token.interface';

let authController: AuthController;
const mockRequest = getMockReq<AuthRequest>({ user: new SafeUserDto() });
const { res: mockResponse } = getMockRes();
const mockConfigProp = 'mockConfigProp';

describe('AuthController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn((): AuthToken => {
              return {
                access_token: 'access_token',
              };
            }),
            signUp: jest.fn(() => Promise.resolve()),
            isLoggedIn: jest.fn(() => true),
          },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn(() => mockConfigProp) },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signIn', () => {
    it('should return void', () => {
      expect(authController.signIn(mockRequest, mockResponse)).toBeUndefined();
    });
  });

  describe('signOut', () => {
    it('should return void', () => {
      expect(authController.signOut(mockResponse)).toBeUndefined();
    });
  });

  describe('signUp', () => {
    it('should return a promise of void', async () => {
      await expect(authController.signUp()).resolves.toBeUndefined();
    });
    expect.assertions(1);
  });

  describe('isLoggedIn', () => {
    it('should return a true', async () => {
      expect(authController.isLoggedIn(mockRequest)).toEqual(true);
    });
    expect.assertions(1);
  });
});

describe('AuthController errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn((): AuthRequest => {
              throw new Error();
            }),
            signUp: jest.fn(() => Promise.reject(new Error())),
            isLoggedIn: jest.fn(() => {
              throw new Error();
            }),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => {
              throw new Error();
            }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signIn with error', () => {
    it('should throw an error', () => {
      expect(() => {
        authController.signIn(mockRequest, mockResponse);
      }).toThrowError();
    });
  });

  describe('signUp with error', () => {
    it('should throw an error', async () => {
      await expect(authController.signUp()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('isLoggedIn with error', () => {
    it('should throw an error', async () => {
      expect(() => {
        authController.isLoggedIn(mockRequest);
      }).toThrowError();
      expect.assertions(1);
    });
  });
});
