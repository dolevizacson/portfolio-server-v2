import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRequest } from './interfaces/auth-request.interface';
import { AuthToken } from './interfaces/auth-token.interface';

let authController: AuthController;
const mockRequest = {} as AuthRequest;

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
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an auth token', () => {
      expect(authController.signIn(mockRequest)).toEqual({
        access_token: 'access_token',
      });
    });
    it('should be executed once', () => {
      const spy = jest.spyOn(authController, 'signIn');
      authController.signIn(mockRequest);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('signUp', () => {
    it('should return a promise of void', async () => {
      await expect(authController.signUp()).resolves.toBeUndefined();
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(authController, 'signUp');
      await authController.signUp();
      expect(spy).toBeCalledTimes(1);
    });
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
        authController.signIn(mockRequest);
      }).toThrowError();
    });
  });

  describe('signUp with error', () => {
    it('should throw an error', async () => {
      await expect(authController.signUp()).rejects.toThrowError();
    });
  });
});
