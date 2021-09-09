import { Test, TestingModule } from '@nestjs/testing';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

let projectController: ProjectsController;
const mockCreatProjectDto = new CreateProjectDto();
const mockUpdateProjectDto = new UpdateProjectDto();
const mockId = 'mockId';

describe('ProjectsController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            findAll: jest.fn(() => Promise.resolve(['project'])),
            findAllActive: jest.fn(() => Promise.resolve(['project'])),
            findOne: jest.fn(() => Promise.resolve('project')),
            findOneActive: jest.fn(() => Promise.resolve('project')),
            update: jest.fn(() => Promise.resolve('project')),
            toggle: jest.fn(() => Promise.resolve('project')),
            create: jest.fn(() => Promise.resolve('project')),
            remove: jest.fn(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    projectController = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(projectController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a promise of array of projects', async () => {
      await expect(projectController.findAll()).resolves.toEqual(['project']);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(projectController, 'findAll');
      await projectController.findAll();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of projects', async () => {
      await expect(projectController.findAllActive()).resolves.toEqual([
        'project',
      ]);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(projectController, 'findAllActive');
      await projectController.findAllActive();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a project', async () => {
      expect(projectController.findOne(mockId)).resolves.toEqual('project');
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(projectController, 'findOne');
      await projectController.findOne(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a project', async () => {
      await expect(projectController.findOneActive(mockId)).resolves.toEqual(
        'project',
      );
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(projectController, 'findOneActive');
      await projectController.findOneActive(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should return a promise of project', async () => {
      await expect(
        projectController.create(mockCreatProjectDto),
      ).resolves.toEqual('project');
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(projectController, 'create');
      await projectController.create(mockCreatProjectDto);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a promise of a project', async () => {
      await expect(
        projectController.update(mockId, mockUpdateProjectDto),
      ).resolves.toEqual('project');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(projectController, 'update');
      await projectController.update(mockId, mockUpdateProjectDto);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('toggle', () => {
    it('should return a promise of a project', async () => {
      await expect(projectController.toggle(mockId)).resolves.toEqual(
        'project',
      );
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(projectController, 'toggle');
      await projectController.toggle(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      await expect(projectController.remove(mockId)).resolves.toBeUndefined();
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(projectController, 'remove');
      await projectController.remove(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });
});

describe('ProjectsController error', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            findAll: jest.fn(() => Promise.reject(new Error())),
            findAllActive: jest.fn(() => Promise.reject(new Error())),
            findOne: jest.fn(() => Promise.reject(new Error())),
            findOneActive: jest.fn(() => Promise.reject(new Error())),
            update: jest.fn(() => Promise.reject(new Error())),
            toggle: jest.fn(() => Promise.reject(new Error())),
            create: jest.fn(() => Promise.reject(new Error())),
            remove: jest.fn(() => Promise.reject(new Error())),
          },
        },
      ],
    }).compile();

    projectController = module.get<ProjectsController>(ProjectsController);
  });

  it('should be defined', () => {
    expect(projectController).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      await expect(projectController.findAll()).rejects.toThrowError();
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      await expect(projectController.findAllActive()).rejects.toThrowError();
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      expect(projectController.findOne(mockId)).rejects.toThrowError();
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      await expect(
        projectController.findOneActive(mockId),
      ).rejects.toThrowError();
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      await expect(
        projectController.create(mockCreatProjectDto),
      ).rejects.toThrowError();
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      await expect(
        projectController.update(mockId, mockUpdateProjectDto),
      ).rejects.toThrowError();
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      await expect(projectController.toggle(mockId)).rejects.toThrowError();
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      await expect(projectController.remove(mockId)).rejects.toThrowError();
    });
  });
});
