import { Test, TestingModule } from '@nestjs/testing';
import { Image } from '../common/classes/Image';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';

let blogController: BlogController;
const mockCreateBlogPostDto = new CreateBlogPostDto();
const mockUpdateBlogPostDto = new UpdateBlogPostDto();
const mockId = 'mockId';
const mockImage = new Image();

describe('BlogController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [
        {
          provide: BlogService,
          useValue: {
            findAll: jest.fn(() => Promise.resolve(['blog post'])),
            findAllActive: jest.fn(() => Promise.resolve(['blog post'])),
            findOne: jest.fn(() => Promise.resolve('blog post')),
            findOneActive: jest.fn(() => Promise.resolve('blog post')),
            update: jest.fn(() => Promise.resolve('blog post')),
            toggle: jest.fn(() => Promise.resolve('blog post')),
            create: jest.fn(() => Promise.resolve('blog post')),
            remove: jest.fn(() => Promise.resolve()),
            addParagraphImage: jest.fn(() => Promise.resolve('blog post')),
            removeParagraphImage: jest.fn(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    blogController = module.get<BlogController>(BlogController);
  });

  it('should be defined', () => {
    expect(blogController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a promise of array of blog posts', async () => {
      expect.assertions(1);
      await expect(blogController.findAll()).resolves.toEqual(['blog post']);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of blog posts', async () => {
      expect.assertions(1);
      await expect(blogController.findAllActive()).resolves.toEqual([
        'blog post',
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a blog post', async () => {
      expect.assertions(1);
      await expect(blogController.findOne(mockId)).resolves.toEqual(
        'blog post',
      );
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a blog post', async () => {
      expect.assertions(1);
      await expect(blogController.findOneActive(mockId)).resolves.toEqual(
        'blog post',
      );
    });
  });

  describe('create', () => {
    it('should return a promise of blog post', async () => {
      expect.assertions(1);
      await expect(
        blogController.create(mockCreateBlogPostDto),
      ).resolves.toEqual('blog post');
    });
  });

  describe('update', () => {
    it('should return a promise of a blog post', async () => {
      expect.assertions(1);
      await expect(
        blogController.update(mockId, mockUpdateBlogPostDto),
      ).resolves.toEqual('blog post');
    });
  });

  describe('toggle', () => {
    it('should return a promise of a blog post', async () => {
      expect.assertions(1);
      await expect(blogController.toggle(mockId)).resolves.toEqual('blog post');
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      expect.assertions(1);
      await expect(blogController.remove(mockId)).resolves.toBeUndefined();
    });
  });

  describe('createImage', () => {
    it('should return a promise of a blog post', async () => {
      expect.assertions(1);
      await expect(
        blogController.createImage(mockId, mockId, mockImage),
      ).resolves.toEqual('blog post');
    });
  });

  describe('removeImage', () => {
    it('should return a promise of void', async () => {
      expect.assertions(1);
      await expect(
        blogController.removeImage(mockId, mockId, mockId),
      ).resolves.toBeUndefined();
    });
  });
});

describe('ProjectsController error', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogController],
      providers: [
        {
          provide: BlogService,
          useValue: {
            findAll: jest.fn(() => Promise.reject(new Error())),
            findAllActive: jest.fn(() => Promise.reject(new Error())),
            findOne: jest.fn(() => Promise.reject(new Error())),
            findOneActive: jest.fn(() => Promise.reject(new Error())),
            update: jest.fn(() => Promise.reject(new Error())),
            toggle: jest.fn(() => Promise.reject(new Error())),
            create: jest.fn(() => Promise.reject(new Error())),
            remove: jest.fn(() => Promise.reject(new Error())),
            addParagraphImage: jest.fn(() => Promise.reject(new Error())),
            removeParagraphImage: jest.fn(() => Promise.reject(new Error())),
          },
        },
      ],
    }).compile();

    blogController = module.get<BlogController>(BlogController);
  });

  it('should be defined', () => {
    expect(blogController).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(blogController.findAll()).rejects.toThrowError();
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(blogController.findAllActive()).rejects.toThrowError();
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(blogController.findOne(mockId)).rejects.toThrowError();
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(blogController.findOneActive(mockId)).rejects.toThrowError();
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        blogController.create(mockCreateBlogPostDto),
      ).rejects.toThrowError();
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        blogController.update(mockId, mockUpdateBlogPostDto),
      ).rejects.toThrowError();
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(blogController.toggle(mockId)).rejects.toThrowError();
    });
  });

  describe('createImage with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        blogController.createImage(mockId, mockId, mockImage),
      ).rejects.toThrowError();
    });
  });

  describe('removeImage with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        blogController.removeImage(mockId, mockId, mockId),
      ).rejects.toThrowError();
    });
  });
});
