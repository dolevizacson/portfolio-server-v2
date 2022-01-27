import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
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
      ],
    }).compile();

    newService = module.get<NewService>(NewService);
  });

  it('should be defined', () => {
    expect(newService).toBeDefined();
  });

  describe('getNewDocument', () => {
    it('should return a promise of array of new document', async () => {
      await expect(newService.getNewDocument()).resolves.toHaveProperty(
        'name',
        'new document',
      );
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(newService, 'getNewDocument');
      await newService.getNewDocument();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('toFirstLowerLetter', () => {
    it('should transform the first letter to lower case', async () => {
      expect(newService.toFirstLowerLetter('SomeName')).toEqual('someName');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(newService, 'toFirstLowerLetter');
      newService.toFirstLowerLetter('SomeName');
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('createNew', () => {
    it('should return a promise a key from new document', async () => {
      await expect(newService.createNew(SomeClass)).resolves.toEqual(mockClass);
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(newService, 'createNew');
      await newService.createNew(SomeClass);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('updateNew', () => {
    it('should return a promise a key from new document', async () => {
      await expect(newService.updateNew(SomeClass, itemDto)).resolves.toEqual(
        mockClass,
      );
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(newService, 'updateNew');
      await newService.updateNew(SomeClass, itemDto);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('removeNew', () => {
    it('should return a promise of void', async () => {
      await expect(newService.removeNew(SomeClass)).resolves.toBeUndefined();
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(newService, 'removeNew');
      await newService.removeNew(SomeClass);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('removeNewProject', () => {
    it('should return a promise of void', async () => {
      await expect(newService.removeNewProject()).resolves.toBeUndefined();
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(newService, 'removeNewProject');
      await newService.removeNewProject();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('addNewProjectImage', () => {
    it('should return a promise of a project', async () => {
      await expect(
        newService.addNewProjectImage(mockImage),
      ).resolves.toHaveProperty('name', 'project');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(newService, 'addNewProjectImage');
      await newService.addNewProjectImage(mockImage);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('removeNewProjectImage', () => {
    it('should return a promise of void', async () => {
      await expect(
        newService.removeNewProjectImage(mockId),
      ).resolves.toBeUndefined();
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(newService, 'removeNewProjectImage');
      await newService.removeNewProjectImage(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('removeNewBlogPost', () => {
    it('should return a promise of void', async () => {
      await expect(newService.removeNewBlogPost()).resolves.toBeUndefined();
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(newService, 'removeNewBlogPost');
      await newService.removeNewBlogPost();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('addNewBlogPostParagraphImage', () => {
    it('should return a promise of a project', async () => {
      await expect(
        newService.addNewBlogPostParagraphImage(mockId, mockImage),
      ).resolves.toHaveProperty('name', 'blog post');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(newService, 'addNewBlogPostParagraphImage');
      await newService.addNewBlogPostParagraphImage(mockId, mockImage);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('removeNewBlogPostParagraphImage', () => {
    it('should return a promise of void', async () => {
      await expect(
        newService.removeNewBlogPostParagraphImage(mockId, mockImageId),
      ).resolves.toBeUndefined();
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(newService, 'removeNewBlogPostParagraphImage');
      await newService.removeNewBlogPostParagraphImage(mockId, mockImageId);
      expect(spy).toBeCalledTimes(1);
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
      ],
    }).compile();

    newService = module.get<NewService>(NewService);
  });

  it('should be defined', () => {
    expect(newService).toBeDefined();
  });

  describe('getNewDocument with error', () => {
    it('should throw an error', async () => {
      await expect(newService.getNewDocument()).rejects.toThrowError();
      expect.assertions(1);
    });
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
