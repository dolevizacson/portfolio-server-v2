import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';
import { Project } from './schemas/project.schema';

let projectService: ProjectsService;
const mockCreatProjectDto = new CreateProjectDto();
const mockUpdateProjectDto = new UpdateProjectDto();
const mockId = 'mockId';

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
              return { exec: jest.fn(() => Promise.resolve('project')) };
            }),
            findOne: jest.fn(() => {
              return { exec: jest.fn(() => Promise.resolve('project')) };
            }),
            findByIdAndUpdate: jest.fn(() => {
              return { exec: jest.fn(() => Promise.resolve('project')) };
            }),
            findByIdAndDelete: jest.fn(() => {
              return { exec: jest.fn(() => Promise.resolve('project')) };
            }),
            create: jest.fn(() => Promise.resolve('project')),
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
      await expect(projectService.findAll()).resolves.toEqual(['project']);
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(projectService, 'findAll');
      await projectService.findAll();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of projects', async () => {
      await expect(projectService.findAllActive()).resolves.toEqual([
        'project',
      ]);
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(projectService, 'findAllActive');
      await projectService.findAllActive();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a project', async () => {
      await expect(projectService.findOne(mockId)).resolves.toEqual('project');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(projectService, 'findOne');
      await projectService.findOne(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a project', async () => {
      await expect(projectService.findOneActive(mockId)).resolves.toEqual(
        'project',
      );
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(projectService, 'findOneActive');
      await projectService.findOneActive(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should return a promise of a project', async () => {
      await expect(projectService.create(mockCreatProjectDto)).resolves.toEqual(
        'project',
      );
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(projectService, 'create');
      await projectService.create(mockCreatProjectDto);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a promise of a project', async () => {
      await expect(
        projectService.update(mockId, mockUpdateProjectDto),
      ).resolves.toEqual('project');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(projectService, 'update');
      await projectService.update(mockId, mockUpdateProjectDto);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('toggle', () => {
    it('should return a promise of a project', async () => {
      await expect(projectService.toggle(mockId)).resolves.toEqual('project');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(projectService, 'toggle');
      await projectService.toggle(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      await expect(projectService.remove(mockId)).resolves.toBeUndefined();
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(projectService, 'remove');
      await projectService.remove(mockId);
      expect(spy).toBeCalledTimes(1);
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
      ],
    }).compile();

    projectService = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(projectService).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      await expect(projectService.findAll()).rejects.toThrowError();
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      await expect(projectService.findAllActive()).rejects.toThrowError();
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      await expect(projectService.findOne(mockId)).rejects.toThrowError();
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      await expect(projectService.findOneActive(mockId)).rejects.toThrowError();
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      await expect(
        projectService.create(mockCreatProjectDto),
      ).rejects.toThrowError();
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      await expect(
        projectService.update(mockId, mockUpdateProjectDto),
      ).rejects.toThrowError();
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      await expect(projectService.toggle(mockId)).rejects.toThrowError();
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      await expect(projectService.remove(mockId)).rejects.toThrowError();
    });
  });
});
