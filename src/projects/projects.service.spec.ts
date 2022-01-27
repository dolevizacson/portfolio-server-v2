import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { Image } from '../common/classes/Image';

import { CommonFiles } from '../common/enums/common-files.enum';
import { CloudinaryService } from '../file-uploader/cloudinary.service';
import { SkillsCategory } from '../skills-categories/schemas/skills-category.schema';
import { Skill } from '../skills/schemas/skill.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';
import { Project } from './schemas/project.schema';

let projectService: ProjectsService;
const mockCreatProjectDto = new CreateProjectDto();
const mockUpdateProjectDto = new UpdateProjectDto();
const mockImage = new Image();
const mockId = 'mockId';
const mockUrl = 'mockUrl';
const mockImageId = 'mockImageId';

mockUpdateProjectDto.technologies = [new mongoose.Types.ObjectId()];
mockImage.url = mockUrl;

describe('ProjectsService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getModelToken(Project.name),
          useValue: {
            find: jest.fn(() => {
              return { exec: jest.fn(() => Promise.resolve(['project'])) };
            }),
            findById: jest.fn(() => {
              return {
                populate: jest.fn(() => {
                  return {
                    session: jest.fn(() => {
                      return {
                        exec: jest.fn(() =>
                          Promise.resolve({
                            technologies: [
                              {
                                projects: [],
                                save: jest.fn(() => Promise.resolve()),
                              },
                            ],
                            images: [{ id: mockId }],
                          }),
                        ),
                      };
                    }),
                  };
                }),
                session: jest.fn(() => {
                  return {
                    exec: jest.fn(() => {
                      return Promise.resolve({
                        images: [],
                        save: jest.fn(() => Promise.resolve()),
                        name: 'project',
                      });
                    }),
                  };
                }),
                exec: jest.fn(() => Promise.resolve('project')),
              };
            }),
            findOne: jest.fn(() => {
              return { exec: jest.fn(() => Promise.resolve('project')) };
            }),
            findByIdAndUpdate: jest.fn(() => {
              return {
                session: jest.fn(() => {
                  return {
                    exec: jest.fn(() => {
                      return Promise.resolve({ name: 'project', _id: mockId });
                    }),
                  };
                }),
                exec: jest.fn(() => Promise.resolve('project')),
              };
            }),
            findByIdAndDelete: jest.fn(() => {
              return {
                session: jest.fn(() => {
                  return { exec: jest.fn(() => Promise.resolve()) };
                }),
                exec: jest.fn(() => Promise.resolve('project')),
              };
            }),
            create: jest.fn(() => Promise.resolve(['project'])),
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
        {
          provide: getModelToken(Skill.name),
          useValue: {
            find: jest.fn(() => {
              return {
                populate: jest.fn(() => {
                  return {
                    session: jest.fn(() => {
                      return {
                        exec: jest.fn(() =>
                          Promise.resolve([
                            {
                              projects: [],
                              save: jest.fn(() => Promise.resolve()),
                            },
                          ]),
                        ),
                      };
                    }),
                  };
                }),
                exec: jest.fn(() => Promise.resolve(['skill'])),
              };
            }),
            findById: jest.fn(() => {
              return {
                session: jest.fn(() => {
                  return {
                    exec: jest.fn(() =>
                      Promise.resolve({
                        skillCategory: { _id: mockId },
                        projects: [],
                        save: jest.fn(() => Promise.resolve()),
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
                    exec: jest.fn(() => Promise.resolve('skill')),
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

    projectService = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(projectService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a promise of array of projects', async () => {
      expect.assertions(1);
      await expect(projectService.findAll()).resolves.toEqual(['project']);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of projects', async () => {
      expect.assertions(1);
      await expect(projectService.findAllActive()).resolves.toEqual([
        'project',
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a project', async () => {
      expect.assertions(1);
      await expect(projectService.findOne(mockId)).resolves.toEqual('project');
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a project', async () => {
      expect.assertions(1);
      await expect(projectService.findOneActive(mockId)).resolves.toEqual(
        'project',
      );
    });
  });

  describe('create', () => {
    it('should return a promise of a project', async () => {
      expect.assertions(1);
      await expect(projectService.create(mockCreatProjectDto)).resolves.toEqual(
        'project',
      );
    });
  });

  describe('update', () => {
    it('should return a promise of a project', async () => {
      expect.assertions(1);
      await expect(
        projectService.update(mockId, mockUpdateProjectDto),
      ).resolves.toHaveProperty('name', 'project');
    });
  });

  describe('toggle', () => {
    it('should return a promise of a project', async () => {
      expect.assertions(1);
      await expect(projectService.toggle(mockId)).resolves.toEqual('project');
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      expect.assertions(1);
      await expect(projectService.remove(mockId)).resolves.toBeUndefined();
    });
  });

  describe('createImage', () => {
    it('should return a promise of project', async () => {
      expect.assertions(1);
      await expect(
        projectService.createImage(mockId, mockImage),
      ).resolves.toHaveProperty('name', 'project');
    });
  });

  describe('removeImage', () => {
    it('should return a promise of void', async () => {
      expect.assertions(1);
      await expect(
        projectService.removeImage(mockId, mockImageId),
      ).resolves.toBeUndefined();
    });
  });
});

describe('ProjectsService errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
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
        {
          provide: CloudinaryService,
          useValue: {
            uploadImage: jest.fn(() => Promise.reject(new Error())),
            deleteImage: jest.fn(() => Promise.reject(new Error())),
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
        { provide: 'DatabaseConnection', useValue: {} },
        {
          provide: CommonFiles.helpers,
          useValue: {
            mongooseTransaction: jest.fn(() => Promise.reject(new Error())),
          },
        },
      ],
    }).compile();

    projectService = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(projectService).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(projectService.findAll()).rejects.toThrowError();
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(projectService.findAllActive()).rejects.toThrowError();
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(projectService.findOne(mockId)).rejects.toThrowError();
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(projectService.findOneActive(mockId)).rejects.toThrowError();
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        projectService.create(mockCreatProjectDto),
      ).rejects.toThrowError();
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        projectService.update(mockId, mockUpdateProjectDto),
      ).rejects.toThrowError();
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(projectService.toggle(mockId)).rejects.toThrowError();
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(projectService.remove(mockId)).rejects.toThrowError();
    });
  });

  describe('createImage with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        projectService.createImage(mockId, mockImage),
      ).rejects.toThrowError();
    });
  });

  describe('removeImage with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        projectService.removeImage(mockId, mockImageId),
      ).rejects.toThrowError();
    });
  });
});
