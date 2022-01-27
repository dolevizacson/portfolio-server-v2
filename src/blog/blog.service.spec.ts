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
      expect.assertions(1);
      await expect(blogService.findAll()).resolves.toEqual(['blog post']);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of blog posts', async () => {
      expect.assertions(1);
      await expect(blogService.findAllActive()).resolves.toEqual(['blog post']);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a blog post', async () => {
      expect.assertions(1);
      await expect(blogService.findOne(mockId)).resolves.toEqual('blog post');
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a blog post', async () => {
      expect.assertions(1);
      await expect(blogService.findOneActive(mockId)).resolves.toEqual(
        'blog post',
      );
    });
  });

  describe('create', () => {
    it('should return a promise of a blog post', async () => {
      expect.assertions(1);
      await expect(blogService.create(mockCreateBlogPostDto)).resolves.toEqual(
        'blog post',
      );
    });
  });

  describe('update', () => {
    it('should return a promise of a blog post', async () => {
      expect.assertions(1);
      await expect(
        blogService.update(mockId, mockUpdateBlogPostDto),
      ).resolves.toHaveProperty('name', 'blog post');
    });
  });

  describe('toggle', () => {
    it('should return a promise of a blog post', async () => {
      expect.assertions(1);
      await expect(blogService.toggle(mockId)).resolves.toEqual('blog post');
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      expect.assertions(1);
      await expect(blogService.remove(mockId)).resolves.toBeUndefined();
    });
  });

  describe('addParagraphImage', () => {
    it('should return a promise of blog post', async () => {
      expect.assertions(1);
      await expect(
        blogService.addParagraphImage(mockId, mockParagraphId, mockImage),
      ).resolves.toHaveProperty('name', 'blog post');
    });
  });

  describe('removeParagraphImage', () => {
    it('should return a promise of void', async () => {
      expect.assertions(1);
      await expect(
        blogService.removeParagraphImage(mockId, mockParagraphId, mockImageId),
      ).resolves.toBeUndefined();
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
      expect.assertions(1);
      await expect(blogService.findAll()).rejects.toThrowError();
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(blogService.findAllActive()).rejects.toThrowError();
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(blogService.findOne(mockId)).rejects.toThrowError();
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(blogService.findOneActive(mockId)).rejects.toThrowError();
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        blogService.create(mockCreateBlogPostDto),
      ).rejects.toThrowError();
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        blogService.update(mockId, mockUpdateBlogPostDto),
      ).rejects.toThrowError();
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(blogService.toggle(mockId)).rejects.toThrowError();
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(blogService.remove(mockId)).rejects.toThrowError();
    });
  });

  describe('addParagraphImage with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        blogService.addParagraphImage(mockId, mockParagraphId, mockImage),
      ).rejects.toThrowError();
    });
  });

  describe('removeParagraphImage with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        blogService.removeParagraphImage(mockId, mockParagraphId, mockImageId),
      ).rejects.toThrowError();
    });
  });
});
