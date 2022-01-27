import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CommonFiles } from '../common/enums/common-files.enum';

import { Project } from '../projects/schemas/project.schema';
import { Skill } from '../skills/schemas/skill.schema';
import { CreateSkillsCategoryDto } from './dto/create-skills-category.dto';
import { UpdateSkillsCategoryDto } from './dto/update-skills-category.dto';
import { SkillsCategory } from './schemas/skills-category.schema';
import { SkillsCategoriesService } from './skills-categories.service';

let skillsCategoriesService: SkillsCategoriesService;
const mockId = 'mockId';
const mockCreateSkillsCategoryDto = new CreateSkillsCategoryDto();
const mockUpdateSkillsCategoryDto = new UpdateSkillsCategoryDto();

describe('SkillsCategoriesService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillsCategoriesService,
        {
          provide: getModelToken(SkillsCategory.name),
          useValue: {
            find: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve(['skills category'])),
              };
            }),
            findById: jest.fn(() => {
              return {
                session: jest.fn(() => {
                  return {
                    exec: jest.fn(() =>
                      Promise.resolve({
                        skills: [mockId],
                        save: jest.fn(() => Promise.resolve()),
                      }),
                    ),
                  };
                }),
                exec: jest.fn(() => Promise.resolve('skills category')),
              };
            }),
            findOne: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve('skills category')),
              };
            }),
            findByIdAndUpdate: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve('skills category')),
              };
            }),
            findByIdAndDelete: jest.fn(() => {
              return {
                session: jest.fn(() => {
                  return {
                    exec: jest.fn(() => Promise.resolve()),
                  };
                }),
                exec: jest.fn(() => Promise.resolve('skills category')),
              };
            }),
            create: jest.fn(() => Promise.resolve('skills category')),
          },
        },
        {
          provide: getModelToken(Skill.name),
          useValue: {
            find: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve(['skill'])),
              };
            }),
            findById: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve('skill')),
              };
            }),
            findOne: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve('skill')),
              };
            }),
            findByIdAndUpdate: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve('skill')),
              };
            }),
            findByIdAndDelete: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve('skill')),
              };
            }),
            create: jest.fn(() => Promise.resolve('skill')),
          },
        },
        {
          provide: getModelToken(Project.name),
          useValue: {
            find: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve(['project'])),
              };
            }),
            findById: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve('project')),
              };
            }),
            findOne: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve('project')),
              };
            }),
            findByIdAndUpdate: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve('project')),
              };
            }),
            findByIdAndDelete: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve('project')),
              };
            }),
            create: jest.fn(() => Promise.resolve('project')),
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
        {
          provide: CommonFiles.services,
          useValue: { removeSkill: jest.fn(() => Promise.resolve) },
        },
      ],
    }).compile();

    skillsCategoriesService = module.get<SkillsCategoriesService>(
      SkillsCategoriesService,
    );
  });

  it('should be defined', () => {
    expect(skillsCategoriesService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a promise of array of skills categories', async () => {
      await expect(skillsCategoriesService.findAll()).resolves.toEqual([
        'skills category',
      ]);
      expect.assertions(1);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of skills categories', async () => {
      await expect(skillsCategoriesService.findAllActive()).resolves.toEqual([
        'skills category',
      ]);
      expect.assertions(1);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a skills category', async () => {
      await expect(skillsCategoriesService.findOne(mockId)).resolves.toEqual(
        'skills category',
      );
      expect.assertions(1);
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a skills category', async () => {
      await expect(
        skillsCategoriesService.findOneActive(mockId),
      ).resolves.toEqual('skills category');
      expect.assertions(1);
    });
  });

  describe('create', () => {
    it('should return a promise of a skills category', async () => {
      await expect(
        skillsCategoriesService.create(mockCreateSkillsCategoryDto),
      ).resolves.toEqual('skills category');
      expect.assertions(1);
    });
  });

  describe('update', () => {
    it('should return a promise of a skills category', async () => {
      await expect(
        skillsCategoriesService.update(mockId, mockUpdateSkillsCategoryDto),
      ).resolves.toEqual('skills category');
      expect.assertions(1);
    });
  });

  describe('toggle', () => {
    it('should return a promise of a skills category', async () => {
      await expect(skillsCategoriesService.toggle(mockId)).resolves.toEqual(
        'skills category',
      );
      expect.assertions(1);
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      await expect(
        skillsCategoriesService.remove(mockId),
      ).resolves.toBeUndefined();
      expect.assertions(1);
    });
  });
});

describe('SkillsCategoriesService errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillsCategoriesService,
        {
          provide: getModelToken(SkillsCategory.name),
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
          provide: getModelToken(Skill.name),
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
          provide: getModelToken(Project.name),
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
        { provide: 'DatabaseConnection', useValue: {} },
        {
          provide: CommonFiles.helpers,
          useValue: {
            mongooseTransaction: jest.fn(() => Promise.reject(new Error())),
          },
        },
        { provide: CommonFiles.services, useValue: {} },
      ],
    }).compile();

    skillsCategoriesService = module.get<SkillsCategoriesService>(
      SkillsCategoriesService,
    );
  });

  it('should be defined', () => {
    expect(skillsCategoriesService).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      await expect(skillsCategoriesService.findAll()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsCategoriesService.findAllActive(),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsCategoriesService.findOne(mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsCategoriesService.findOneActive(mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsCategoriesService.create(mockCreateSkillsCategoryDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsCategoriesService.update(mockId, mockUpdateSkillsCategoryDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsCategoriesService.toggle(mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsCategoriesService.remove(mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
