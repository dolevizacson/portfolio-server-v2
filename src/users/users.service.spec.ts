import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { UserCredentialsDto } from './dto/user-credentials.dto';

import { User, UserDocument } from './schemas/user.schema';
import { UsersService } from './users.service';

let usersService: UsersService;
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

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a promise of a user', async () => {
      await expect(usersService.findOne(mockSearchFilter)).resolves.toEqual(
        'user',
      );
      expect.assertions(1);
    });
  });

  describe('create', () => {
    it('should return a promise of void', async () => {
      await expect(
        usersService.create(mockUserCredentialsDto),
      ).resolves.toBeUndefined();
      expect.assertions(1);
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

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      await expect(
        usersService.findOne(mockSearchFilter),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      await expect(
        usersService.create(mockUserCredentialsDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
