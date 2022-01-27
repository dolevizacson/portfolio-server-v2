import { Test, TestingModule } from '@nestjs/testing';
import { Libs } from '../common/enums/external-libs.enum';
import { CloudinaryService } from './cloudinary.service';

let cloudinaryService: CloudinaryService;
const mockFile = 'mockFile';
const mockId = 'mockId';
const mockName = 'mockName';

describe('CloudinaryService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CloudinaryService,
        {
          provide: Libs.cloudinary,
          useValue: {
            v2: {
              uploader: {
                upload: jest.fn(() => Promise.resolve('response')),
                destroy: jest.fn(() => Promise.resolve()),
                rename: jest.fn(() => Promise.resolve('new name')),
              },
              api: {
                delete_resources_by_prefix: jest.fn(() => Promise.resolve()),
                delete_folder: jest.fn(() => Promise.resolve()),
              },
            },
          },
        },
      ],
    }).compile();

    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should be defined', () => {
    expect(cloudinaryService).toBeDefined();
  });

  describe('uploadImage', () => {
    it('should return a promise of response object', async () => {
      await expect(cloudinaryService.uploadImage(mockFile)).resolves.toEqual(
        'response',
      );
      expect.assertions(1);
    });
  });

  describe('deleteImage', () => {
    it('should return a promise of void', async () => {
      await expect(
        cloudinaryService.deleteImage(mockId),
      ).resolves.toBeUndefined();
      expect.assertions(1);
    });
  });

  describe('renameImage', () => {
    it('should return a promise of string', async () => {
      await expect(
        cloudinaryService.renameImage(mockId, mockId),
      ).resolves.toEqual('new name');
      expect.assertions(1);
    });
  });

  describe('deleteFolder', () => {
    it('should return a promise of void', async () => {
      await expect(
        cloudinaryService.deleteFolder(mockName),
      ).resolves.toBeUndefined();
      expect.assertions(1);
    });
  });
});

describe('CloudinaryService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CloudinaryService,
        {
          provide: Libs.cloudinary,
          useValue: {
            v2: {
              uploader: {
                upload: jest.fn(() => Promise.reject(new Error())),
                destroy: jest.fn(() => Promise.reject(new Error())),
                rename: jest.fn(() => Promise.reject(new Error())),
              },
              api: {
                delete_resources_by_prefix: jest.fn(() =>
                  Promise.reject(new Error()),
                ),
                delete_folder: jest.fn(() => Promise.reject(new Error())),
              },
            },
          },
        },
      ],
    }).compile();

    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should be defined', () => {
    expect(cloudinaryService).toBeDefined();
  });

  describe('uploadImage with error', () => {
    it('should throw an error', async () => {
      await expect(
        cloudinaryService.uploadImage(mockFile),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('deleteImage with error', () => {
    it('should throw an error', async () => {
      await expect(
        cloudinaryService.deleteImage(mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('renameImage with error', () => {
    it('should throw an error', async () => {
      await expect(
        cloudinaryService.renameImage(mockFile, mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('deleteFolder with error', () => {
    it('should throw an error', async () => {
      await expect(
        cloudinaryService.deleteFolder(mockName),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
