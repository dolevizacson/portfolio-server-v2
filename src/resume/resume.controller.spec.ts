import { Test, TestingModule } from '@nestjs/testing';
import { ReadStream } from 'fs';
import { getMockRes } from '@jest-mock/express';
import { mock } from 'jest-mock-extended';

import { CommonFiles } from '../common/enums/common-files.enum';
import { Libs } from '../common/enums/external-libs.enum';
import { ResumeController } from './resume.controller';
import { ResumeService } from './resume.service';
import { CreateResumeDto } from './dto/create-resume.dto';

let resumeController: ResumeController;
const { res: mockResponse } = getMockRes();
const mockId = 'mockId';
const mockName = 'mockName';
const mockNameOnDisk = 'mockNameOnDisk';
const mockMimeType = 'mockMimeType';
const mockExtension = 'mockExtension';
const mockCreateResumeDto = new CreateResumeDto();
const mockFileObject = mock<Express.Multer.File>();

mockFileObject.filename = mockName;
mockFileObject.mimetype = mockMimeType;

describe('ResumeController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeController],
      providers: [
        {
          provide: ResumeService,
          useValue: {
            findAll: jest.fn(() => Promise.resolve(['resume'])),
            findAllActive: jest.fn(() => Promise.resolve(['resume'])),
            get: jest.fn(() =>
              Promise.resolve({
                name: mockName,
                nameOnDisk: mockNameOnDisk,
                fileType: {
                  mimeType: mockMimeType,
                  extension: mockExtension,
                },
              }),
            ),
            add: jest.fn(() => Promise.resolve('resume')),
            remove: jest.fn(() => Promise.resolve()),
          },
        },
        {
          provide: CommonFiles.helpers,
          useValue: {
            getFileExtensionFromMimeType: jest.fn(() => mockExtension),
          },
        },
        {
          provide: Libs.fs,
          useValue: { createReadStream: jest.fn(() => new ReadStream()) },
        },
      ],
    }).compile();

    resumeController = module.get<ResumeController>(ResumeController);
  });

  it('should be defined', () => {
    expect(resumeController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a promise of array of resume', async () => {
      await expect(resumeController.findAll()).resolves.toEqual(['resume']);
      expect.assertions(1);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of resume', async () => {
      await expect(resumeController.findAllActive()).resolves.toEqual([
        'resume',
      ]);
      expect.assertions(1);
    });
  });

  describe('get', () => {
    it('should return a promise of streamable file', async () => {
      await expect(
        resumeController.get(mockResponse, mockId),
      ).resolves.toMatchObject({
        getStream: expect.any(Function),
        getHeaders: expect.any(Function),
      });
      expect.assertions(1);
    });
  });

  describe('add', () => {
    it('should return a promise of resume', async () => {
      await expect(
        resumeController.add(mockFileObject, mockCreateResumeDto),
      ).resolves.toEqual('resume');
      expect.assertions(1);
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      await expect(resumeController.remove(mockId)).resolves.toBeUndefined();
      expect.assertions(1);
    });
  });
});

describe('ResumeController errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeController],
      providers: [
        {
          provide: ResumeService,
          useValue: {
            findAll: jest.fn(() => Promise.reject(new Error())),
            findAllActive: jest.fn(() => Promise.reject(new Error())),
            get: jest.fn(() => Promise.reject(new Error())),
            add: jest.fn(() => Promise.reject(new Error())),
            remove: jest.fn(() => Promise.reject(new Error())),
          },
        },
        {
          provide: CommonFiles.helpers,
          useValue: {
            getFileExtensionFromMimeType: jest.fn(() => mockExtension),
          },
        },
        {
          provide: Libs.fs,
          useValue: { createReadStream: jest.fn(() => new ReadStream()) },
        },
      ],
    }).compile();

    resumeController = module.get<ResumeController>(ResumeController);
  });

  it('should be defined', () => {
    expect(resumeController).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      await expect(resumeController.findAll()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      await expect(resumeController.findAllActive()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('get with error', () => {
    it('should throw an error', async () => {
      await expect(
        resumeController.get(mockResponse, mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('add with error', () => {
    it('should throw an error', async () => {
      await expect(
        resumeController.add(mockFileObject, mockCreateResumeDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      await expect(resumeController.remove(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
