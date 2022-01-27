import { Test, TestingModule } from '@nestjs/testing';
import { Libs } from '../common/enums/external-libs.enum';
import { BcryptService } from './bcrypt.service';

let bcryptService: BcryptService;
const mockPassword = 'mockPassword';
const mockHashedPassword = 'mockHashedPassword';
const mockHash = 'mockHash';

describe('BcryptService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BcryptService,
        {
          provide: Libs.bcrypt,
          useValue: {
            compare: jest.fn(() => Promise.resolve(true)),
            genSalt: jest.fn(() => Promise.resolve('mockSalt')),
            hash: jest.fn(() => Promise.resolve('mockHash')),
          },
        },
      ],
    }).compile();

    bcryptService = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(bcryptService).toBeDefined();
  });

  describe('compare', () => {
    it('should return a promise of true', async () => {
      await expect(
        bcryptService.compare(mockPassword, mockHashedPassword),
      ).resolves.toEqual(true);
      expect.assertions(1);
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(bcryptService, 'compare');
      await bcryptService.compare(mockPassword, mockHashedPassword);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('generateHash', () => {
    it('should return a promise of a string', async () => {
      await expect(bcryptService.generateHash(mockPassword)).resolves.toEqual(
        mockHash,
      );
      expect.assertions(1);
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(bcryptService, 'generateHash');
      await bcryptService.generateHash(mockPassword);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });
});

describe('BcryptService errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BcryptService,
        {
          provide: Libs.bcrypt,
          useValue: {
            compare: jest.fn(() => Promise.reject(new Error())),
            genSalt: jest.fn(() => Promise.reject(new Error())),
            hash: jest.fn(() => Promise.reject(new Error())),
          },
        },
      ],
    }).compile();

    bcryptService = module.get<BcryptService>(BcryptService);
  });

  it('should be defined', () => {
    expect(bcryptService).toBeDefined();
  });

  describe('compare with error', () => {
    it('should throw an error', async () => {
      await expect(
        bcryptService.compare(mockPassword, mockHashedPassword),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('generateHash with error', () => {
    it('should throw an error', async () => {
      await expect(
        bcryptService.generateHash(mockPassword),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
