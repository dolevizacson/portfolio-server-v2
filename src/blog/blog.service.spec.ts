import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Image } from '../common/classes/Image';

import { CommonFiles } from '../common/enums/common-files.enum';
import { CloudinaryService } from '../file-uploader/cloudinary.service';
import { BlogService } from './blog.service';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { BlogPost } from './schemas/blog-post.schema';

let blogService: BlogService;
const mockCreateBlogPostDto = new CreateBlogPostDto();
const mockUpdateBlogPostDto = new UpdateBlogPostDto();
const mockId = 'mockId';
const mockUrl = 'mockUrl';
const mockParagraphId = 'mockParagraphId';
const mockImage = new Image();
const mockImageId = 'mockImageId';

mockImage.url = mockUrl;

describe('BlogService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: getModelToken(BlogPost.name),
          useValue: {
            find: jest.fn(() => {
              return { exec: jest.fn(() => Promise.resolve(['blog post'])) };
            }),
            findById: jest.fn(() => {
              return {
                session: jest.fn(() => {
                  return {
                    exec: jest.fn(() =>
                      Promise.resolve({
                        name: 'blog post',
                        _id: mockId,
                        paragraphs: [
                          { _id: mockId, gallery: [{ id: mockId }] },
                        ],
                        save: jest.fn(() => Promise.resolve()),
                      }),
                    ),
                  };
                }),
                exec: jest.fn(() => Promise.resolve('blog post')),
              };
            }),
            findOne: jest.fn(() => {
              return { exec: jest.fn(() => Promise.resolve('blog post')) };
            }),
            findByIdAndUpdate: jest.fn(() => {
              return {
                session: jest.fn(() => {
                  return {
                    exec: jest.fn(() =>
                      Promise.resolve({
                        name: 'blog post',
                        _id: mockId,
                        paragraphs: [
                          { _id: mockId, gallery: [{ id: mockId }] },
                        ],
                        save: jest.fn(() => Promise.resolve()),
                      }),
                    ),
                  };
                }),
                exec: jest.fn(() => Promise.resolve('blog post')),
              };
            }),
            findByIdAndDelete: jest.fn(() => {
              return {
                session: jest.fn(() => {
                  return { exec: jest.fn(() => Promise.resolve()) };
                }),
                exec: jest.fn(() => Promise.resolve('blog post')),
              };
            }),
            create: jest.fn(() => Promise.resolve('blog post')),
          },
        },
        {
          provide: CloudinaryService,
          useValue: {
            uploadImage: jest.fn(() =>
              Promise.resolve({ url: mockUrl, id: mockId }),
            ),
            deleteImage: jest.fn(() => Promise.resolve()),
          },
        },
        { provide: 'DatabaseConnection', useValue: {} },
        {
          provide: CommonFiles.helpers,
          useValue: {
            mongooseTransaction: jest.fn(
              async (connection, callback) => await callback(),
            ),
          },
        },
      ],
    }).compile();

    blogService = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(blogService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a promise of array of blog posts', async () => {
      await expect(blogService.findAll()).resolves.toEqual(['blog post']);
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(blogService, 'findAll');
      await blogService.findAll();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of blog posts', async () => {
      await expect(blogService.findAllActive()).resolves.toEqual(['blog post']);
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(blogService, 'findAllActive');
      await blogService.findAllActive();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a blog post', async () => {
      await expect(blogService.findOne(mockId)).resolves.toEqual('blog post');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(blogService, 'findOne');
      await blogService.findOne(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a blog post', async () => {
      await expect(blogService.findOneActive(mockId)).resolves.toEqual(
        'blog post',
      );
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(blogService, 'findOneActive');
      await blogService.findOneActive(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should return a promise of a blog post', async () => {
      await expect(blogService.create(mockCreateBlogPostDto)).resolves.toEqual(
        'blog post',
      );
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(blogService, 'create');
      await blogService.create(mockCreateBlogPostDto);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a promise of a blog post', async () => {
      await expect(
        blogService.update(mockId, mockUpdateBlogPostDto),
      ).resolves.toHaveProperty('name', 'blog post');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(blogService, 'update');
      await blogService.update(mockId, mockUpdateBlogPostDto);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('toggle', () => {
    it('should return a promise of a blog post', async () => {
      await expect(blogService.toggle(mockId)).resolves.toEqual('blog post');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(blogService, 'toggle');
      await blogService.toggle(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      await expect(blogService.remove(mockId)).resolves.toBeUndefined();
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(blogService, 'remove');
      await blogService.remove(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('addParagraphImage', () => {
    it('should return a promise of blog post', async () => {
      await expect(
        blogService.addParagraphImage(mockId, mockParagraphId, mockImage),
      ).resolves.toHaveProperty('name', 'blog post');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(blogService, 'addParagraphImage');
      await blogService.addParagraphImage(mockId, mockParagraphId, mockImage);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('removeParagraphImage', () => {
    it('should return a promise of void', async () => {
      await expect(
        blogService.removeParagraphImage(mockId, mockParagraphId, mockImageId),
      ).resolves.toBeUndefined();
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(blogService, 'removeParagraphImage');
      await blogService.removeParagraphImage(
        mockId,
        mockParagraphId,
        mockImageId,
      );
      expect(spy).toBeCalledTimes(1);
    });
  });
});

describe('ProjectsService errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: getModelToken(BlogPost.name),
          useValue: {
            find: jest.fn(() => {
              return { exec: jest.fn(() => Promise.reject(new Error())) };
            }),
            findById: jest.fn(() => {
              return { exec: jest.fn(() => Promise.reject(new Error())) };
            }),
            findOne: jest.fn(() => {
              return { exec: jest.fn(() => Promise.reject(new Error())) };
            }),
            findByIdAndUpdate: jest.fn(() => {
              return { exec: jest.fn(() => Promise.reject(new Error())) };
            }),
            findByIdAndDelete: jest.fn(() => {
              return { exec: jest.fn(() => Promise.reject(new Error())) };
            }),
            create: jest.fn(() => Promise.reject(new Error())),
          },
        },
        {
          provide: CloudinaryService,
          useValue: {
            uploadImage: jest.fn(() => Promise.reject(new Error())),
            deleteImage: jest.fn(() => Promise.reject(new Error())),
          },
        },
        { provide: 'DatabaseConnection', useValue: {} },
        {
          provide: CommonFiles.helpers,
          useValue: {
            mongooseTransaction: jest.fn(() => Promise.reject(new Error())),
          },
        },
      ],
    }).compile();

    blogService = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(blogService).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      await expect(blogService.findAll()).rejects.toThrowError();
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      await expect(blogService.findAllActive()).rejects.toThrowError();
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      await expect(blogService.findOne(mockId)).rejects.toThrowError();
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      await expect(blogService.findOneActive(mockId)).rejects.toThrowError();
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      await expect(
        blogService.create(mockCreateBlogPostDto),
      ).rejects.toThrowError();
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      await expect(
        blogService.update(mockId, mockUpdateBlogPostDto),
      ).rejects.toThrowError();
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      await expect(blogService.toggle(mockId)).rejects.toThrowError();
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      await expect(blogService.remove(mockId)).rejects.toThrowError();
    });
  });

  describe('addParagraphImage with error', () => {
    it('should throw an error', async () => {
      await expect(
        blogService.addParagraphImage(mockId, mockParagraphId, mockImage),
      ).rejects.toThrowError();
    });
  });

  describe('removeParagraphImage with error', () => {
    it('should throw an error', async () => {
      await expect(
        blogService.removeParagraphImage(mockId, mockParagraphId, mockImageId),
      ).rejects.toThrowError();
    });
  });
});
