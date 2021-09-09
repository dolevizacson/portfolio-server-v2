import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { UserCredentialsDto } from './dto/user-credentials.dto';

import { User, UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

let userService: UsersService;
const mockSearchFilter: FilterQuery<UserDocument> = {};
const mockUserCredentialsDto = new UserCredentialsDto();

describe('UsersService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve('user')),
              };
            }),
            create: jest.fn(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a promise of a user', async () => {
      await expect(userService.findOne(mockSearchFilter)).resolves.toEqual(
        'user',
      );
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(userService, 'findOne');
      await userService.findOne(mockSearchFilter);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should return a promise of void', async () => {
      await expect(
        userService.create(mockUserCredentialsDto),
      ).resolves.toBeUndefined();
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(userService, 'create');
      await userService.create(mockUserCredentialsDto);
      expect(spy).toBeCalledTimes(1);
    });
  });
});

describe('UsersService errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: {
            findOne: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.reject(new Error())),
              };
            }),
            create: jest.fn(() => Promise.reject(new Error())),
          },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      await expect(
        userService.findOne(mockSearchFilter),
      ).rejects.toThrowError();
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      await expect(
        userService.create(mockUserCredentialsDto),
      ).rejects.toThrowError();
    });
  });
});
