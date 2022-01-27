import { Test, TestingModule } from '@nestjs/testing';

import { Libs } from '../common/enums/external-libs.enum';
import { FilesService } from './files.service';

let filesService: FilesService;
const mockPath = 'mockPath';

describe('FilesService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesService,
        {
          provide: Libs.fs,
          useValue: { unlink: jest.fn(() => Promise.resolve()) },
        },
      ],
    }).compile();

    filesService = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(filesService).toBeDefined();
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      await expect(filesService.remove(mockPath)).resolves.toBeUndefined();
      expect.assertions(1);
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(filesService, 'remove');
      await filesService.remove(mockPath);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });
});

describe('FilesService errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesService,
        {
          provide: Libs.fs,
          useValue: { unlink: jest.fn(() => Promise.reject(new Error())) },
        },
      ],
    }).compile();

    filesService = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(filesService).toBeDefined();
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      await expect(filesService.remove(mockPath)).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
