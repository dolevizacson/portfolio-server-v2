import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { HelperFunctionsService } from '../utils/helper-functions.service';
import { ServiceFunctionService } from '../utils/service-functions.service';
import { Image } from '../common/classes/Image';
import { CloudinaryService } from '../file-uploader/cloudinary.service';
import { NewService } from './new.service';
import { New } from './schemas/new.schema';

let newService: NewService;
class SomeClass {}
const mockClass = {};
const itemDto = {};
const mockImage = new Image();
const mockId = 'mockId';
const mockUrl = 'mockUrl';
const mockImageId = 'mockImageId';

describe('NewService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewService,
        {
          provide: getModelToken(New.name),
          useValue: {
            find: jest.fn(() =>
              Promise.resolve([
                {
                  name: 'new document',
                  someClass: mockClass,
                  save: jest.fn(() => Promise.resolve()),
                  newProject: {
                    images: [{ id: mockId }],
                    name: 'project',
                  },
                  newBlogPost: {
                    paragraphs: [{ _id: mockId, gallery: [{ id: mockId }] }],
                    name: 'blog post',
                  },
                },
              ]),
            ),
          },
        },
        {
          provide: CloudinaryService,
          useValue: {
            deleteImage: jest.fn(() => Promise.resolve()),
            uploadImage: jest.fn(() =>
              Promise.resolve({ url: mockUrl, public_id: mockId }),
            ),
          },
        },
        { provide: 'DatabaseConnection', useValue: {} },
        {
          provide: HelperFunctionsService,
          useValue: {
            mongooseTransaction: jest.fn(
              async (connection, callback) => await callback(),
            ),
            toFirstLowerLetter: jest.fn(() => 'key'),
          },
        },
        {
          provide: ServiceFunctionService,
          useValue: {
            getNewDocument: jest.fn(() =>
              Promise.resolve({
                save: jest.fn(() => Promise.resolve()),
                newProject: {
                  images: [{ id: mockId }],
                  name: 'project',
                },
                newBlogPost: {
                  paragraphs: [{ _id: mockId, gallery: [{ id: mockId }] }],
                  name: 'blog post',
                },
              }),
            ),
            removeNewProject: jest.fn(() => Promise.resolve()),
            removeNewBlogPost: jest.fn(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    newService = module.get<NewService>(NewService);
  });

  it('should be defined', () => {
    expect(newService).toBeDefined();
  });

  describe('createNew', () => {
    it('should return a promise a key from new document', async () => {
      expect.assertions(1);
      await expect(newService.createNew(SomeClass)).resolves.toEqual(mockClass);
    });
  });

  describe('updateNew', () => {
    it('should return a promise a key from new document', async () => {
      expect.assertions(1);
      await expect(newService.updateNew(SomeClass, itemDto)).resolves.toEqual(
        mockClass,
      );
    });
  });

  describe('removeNew', () => {
    it('should return a promise of void', async () => {
      expect.assertions(1);
      await expect(newService.removeNew(SomeClass)).resolves.toBeUndefined();
    });
  });

  describe('removeNewProject', () => {
    it('should return a promise of void', async () => {
      expect.assertions(1);
      await expect(newService.removeNewProject()).resolves.toBeUndefined();
    });
  });

  describe('addNewProjectImage', () => {
    it('should return a promise of a project', async () => {
      expect.assertions(1);
      await expect(
        newService.addNewProjectImage(mockImage),
      ).resolves.toHaveProperty('name', 'project');
    });
  });

  describe('removeNewProjectImage', () => {
    it('should return a promise of void', async () => {
      expect.assertions(1);
      await expect(
        newService.removeNewProjectImage(mockId),
      ).resolves.toBeUndefined();
    });
  });

  describe('removeNewBlogPost', () => {
    it('should return a promise of void', async () => {
      expect.assertions(1);
      await expect(newService.removeNewBlogPost()).resolves.toBeUndefined();
    });
  });

  describe('addNewBlogPostParagraphImage', () => {
    it('should return a promise of a project', async () => {
      expect.assertions(1);
      await expect(
        newService.addNewBlogPostParagraphImage(mockId, mockImage),
      ).resolves.toHaveProperty('name', 'blog post');
    });
  });

  describe('removeNewBlogPostParagraphImage', () => {
    it('should return a promise of void', async () => {
      expect.assertions(1);
      await expect(
        newService.removeNewBlogPostParagraphImage(mockId, mockImageId),
      ).resolves.toBeUndefined();
    });
  });
});

describe('NewService errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewService,
        {
          provide: getModelToken(New.name),
          useValue: {
            find: jest.fn(() => Promise.reject(new Error())),
          },
        },
        {
          provide: CloudinaryService,
          useValue: {
            deleteImage: jest.fn(() => Promise.reject(new Error())),
            uploadImage: jest.fn(() => Promise.reject(new Error())),
          },
        },
        { provide: 'DatabaseConnection', useValue: {} },
        {
          provide: HelperFunctionsService,
          useValue: {
            mongooseTransaction: jest.fn(
              async (connection, callback) => await callback(),
            ),
            toFirstLowerLetter: jest.fn(() => 'key'),
          },
        },
        {
          provide: ServiceFunctionService,
          useValue: {
            getNewDocument: jest.fn(() =>
              Promise.resolve({
                save: jest.fn(() => Promise.reject(new Error())),
              }),
            ),
          },
        },
      ],
    }).compile();

    newService = module.get<NewService>(NewService);
  });

  it('should be defined', () => {
    expect(newService).toBeDefined();
  });

  describe('createNew with error', () => {
    it('should throw an error', async () => {
      await expect(newService.createNew(SomeClass)).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('updateNew with error', () => {
    it('should throw an error', async () => {
      await expect(
        newService.updateNew(SomeClass, itemDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('removeNew with error', () => {
    it('should throw an error', async () => {
      await expect(newService.removeNew(SomeClass)).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('removeNewProject with error', () => {
    it('should throw an error', async () => {
      await expect(newService.removeNewProject()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('addNewProjectImage with error', () => {
    it('should throw an error', async () => {
      await expect(
        newService.addNewProjectImage(mockImage),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('removeNewProjectImage with error', () => {
    it('should throw an error', async () => {
      await expect(
        newService.removeNewProjectImage(mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('removeNewBlogPost with error', () => {
    it('should throw an error', async () => {
      await expect(newService.removeNewBlogPost()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('addNewBlogPostParagraphImage with error', () => {
    it('should throw an error', async () => {
      await expect(
        newService.addNewBlogPostParagraphImage(mockId, mockImage),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('removeNewBlogPostParagraphImage with error', () => {
    it('should throw an error', async () => {
      await expect(
        newService.removeNewBlogPostParagraphImage(mockId, mockImageId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
