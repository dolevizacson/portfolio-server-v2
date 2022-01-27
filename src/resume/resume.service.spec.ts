import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CommonFiles } from '../common/enums/common-files.enum';
import { FilesService } from '../file-uploader/files.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { ResumeService } from './resume.service';
import { Resume } from './schemas/resume.schema';

let resumeService: ResumeService;
const mockId = 'mockId';
const mockCreateResumeDto = new CreateResumeDto();
const mockName = 'mockName';

describe('ResumeService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResumeService,
        {
          provide: getModelToken(Resume.name),
          useValue: {
            find: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve(['resume'])),
              };
            }),
            findById: jest.fn(() => {
              return {
                session: jest.fn(() => {
                  return {
                    exec: jest.fn(() =>
                      Promise.resolve({ nameOnDisk: mockName }),
                    ),
                  };
                }),
                exec: jest.fn(() => Promise.resolve('resume')),
              };
            }),
            create: jest.fn(() => Promise.resolve('resume')),
            findByIdAndDelete: jest.fn(() => {
              return {
                session: jest.fn(() => {
                  return {
                    exec: jest.fn(() => Promise.resolve()),
                  };
                }),
              };
            }),
          },
        },
        {
          provide: FilesService,
          useValue: { remove: jest.fn(() => Promise.resolve()) },
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

    resumeService = module.get<ResumeService>(ResumeService);
  });

  it('should be defined', () => {
    expect(resumeService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a promise of array of resume', async () => {
      await expect(resumeService.findAll()).resolves.toEqual(['resume']);
      expect.assertions(1);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of resume', async () => {
      await expect(resumeService.findAllActive()).resolves.toEqual(['resume']);
      expect.assertions(1);
    });
  });

  describe('get', () => {
    it('should return a promise of resume', async () => {
      await expect(resumeService.get(mockId)).resolves.toEqual('resume');
      expect.assertions(1);
    });
  });

  describe('add', () => {
    it('should return a promise of resume', async () => {
      await expect(resumeService.add(mockCreateResumeDto)).resolves.toEqual(
        'resume',
      );
      expect.assertions(1);
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      await expect(resumeService.remove(mockId)).resolves.toBeUndefined();
      expect.assertions(1);
    });
  });
});

describe('ResumeService error', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResumeService,
        {
          provide: getModelToken(Resume.name),
          useValue: {
            find: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.reject(new Error())),
              };
            }),
            findById: jest.fn(() => {
              return {
                session: jest.fn(() => {
                  return {
                    exec: jest.fn(() => Promise.reject(new Error())),
                  };
                }),
                exec: jest.fn(() => Promise.reject(new Error())),
              };
            }),
            create: jest.fn(() => Promise.reject(new Error())),
            findByIdAndDelete: jest.fn(() => {
              return {
                session: jest.fn(() => {
                  return {
                    exec: jest.fn(() => Promise.reject(new Error())),
                  };
                }),
              };
            }),
          },
        },
        {
          provide: FilesService,
          useValue: { remove: jest.fn(() => Promise.reject(new Error())) },
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

    resumeService = module.get<ResumeService>(ResumeService);
  });

  it('should be defined', () => {
    expect(resumeService).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      await expect(resumeService.findAll()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      await expect(resumeService.findAllActive()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('get with error', () => {
    it('should throw an error', async () => {
      await expect(resumeService.get(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('add with error', () => {
    it('should throw an error', async () => {
      await expect(
        resumeService.add(mockCreateResumeDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      await expect(resumeService.remove(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
