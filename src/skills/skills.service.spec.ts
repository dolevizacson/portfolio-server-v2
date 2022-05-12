import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { Project } from '../projects/schemas/project.schema';
import { SkillsCategory } from '../skills-categories/schemas/skills-category.schema';
import { HelperFunctionsService } from '../utils/helper-functions.service';
import { ServiceFunctionService } from '../utils/service-functions.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { Skill } from './schemas/skill.schema';
import { SkillsService } from './skills.service';

let skillsService: SkillsService;
const mockCreateSkillDto = new CreateSkillDto();
const mockUpdatSkillDto = new UpdateSkillDto();
const mockId = 'mockId';

describe('SkillsService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillsService,
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
                session: jest.fn(() => {
                  return {
                    exec: jest.fn(() =>
                      Promise.resolve({
                        skillsCategory: { _id: mockId },
                      }),
                    ),
                  };
                }),
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
                session: jest.fn(() => {
                  return {
                    exec: jest.fn(() =>
                      Promise.resolve({
                        _id: mockId,
                        name: 'skill',
                      }),
                    ),
                  };
                }),
                exec: jest.fn(() => Promise.resolve('skill')),
              };
            }),
            findByIdAndDelete: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve('skill')),
              };
            }),
            create: jest.fn(() => Promise.resolve(['skill'])),
          },
        },
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
                        skills: [],
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
                session: jest.fn(() => {
                  return {
                    exec: jest.fn(() => Promise.resolve()),
                  };
                }),
                exec: jest.fn(() => Promise.resolve('skills category')),
              };
            }),
            findByIdAndDelete: jest.fn(() => {
              return {
                exec: jest.fn(() => Promise.resolve('skills category')),
              };
            }),
            create: jest.fn(() => Promise.resolve('skills category')),
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
            removeSkill: jest.fn(() => Promise.resolve),
            getNewDocument: jest.fn(() =>
              Promise.resolve({
                save: jest.fn(() => Promise.resolve()),
              }),
            ),
          },
        },
      ],
    }).compile();

    skillsService = module.get<SkillsService>(SkillsService);
  });

  it('should be defined', () => {
    expect(skillsService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a promise of array of skills', async () => {
      await expect(skillsService.findAll()).resolves.toEqual(['skill']);
      expect.assertions(1);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of skills', async () => {
      await expect(skillsService.findAllActive()).resolves.toEqual(['skill']);
      expect.assertions(1);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a skill', async () => {
      await expect(skillsService.findOne(mockId)).resolves.toEqual('skill');
      expect.assertions(1);
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a skill', async () => {
      await expect(skillsService.findOneActive(mockId)).resolves.toEqual(
        'skill',
      );
      expect.assertions(1);
    });
  });

  describe('create', () => {
    it('should return a promise of a skill', async () => {
      await expect(skillsService.create(mockCreateSkillDto)).resolves.toEqual(
        'skill',
      );
      expect.assertions(1);
    });
  });

  describe('update', () => {
    it('should return a promise of a skill', async () => {
      await expect(
        skillsService.update(mockId, mockUpdatSkillDto),
      ).resolves.toHaveProperty('name', 'skill');
      expect.assertions(1);
    });
  });

  describe('toggle', () => {
    it('should return a promise of a skill', async () => {
      await expect(skillsService.toggle(mockId)).resolves.toEqual('skill');
      expect.assertions(1);
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      await expect(skillsService.remove(mockId)).resolves.toBeUndefined();
      expect.assertions(1);
    });
  });
});

describe('SkillsService errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillsService,
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
          provide: HelperFunctionsService,
          useValue: {
            mongooseTransaction: jest.fn(() => Promise.reject(new Error())),
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

    skillsService = module.get<SkillsService>(SkillsService);
  });

  it('should be defined', () => {
    expect(skillsService).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      await expect(skillsService.findAll()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      await expect(skillsService.findAllActive()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      await expect(skillsService.findOne(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      await expect(skillsService.findOneActive(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsService.create(mockCreateSkillDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      await expect(
        skillsService.update(mockId, mockUpdatSkillDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      await expect(skillsService.toggle(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      await expect(skillsService.remove(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
