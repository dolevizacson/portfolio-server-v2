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
      expect.assertions(1);
      await expect(projectController.findAll()).resolves.toEqual(['project']);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of projects', async () => {
      expect.assertions(1);
      await expect(projectController.findAllActive()).resolves.toEqual([
        'project',
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a project', async () => {
      expect.assertions(1);
      await expect(projectController.findOne(mockId)).resolves.toEqual(
        'project',
      );
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a project', async () => {
      expect.assertions(1);
      await expect(projectController.findOneActive(mockId)).resolves.toEqual(
        'project',
      );
    });
  });

  describe('create', () => {
    it('should return a promise of project', async () => {
      expect.assertions(1);
      await expect(
        projectController.create(mockCreatProjectDto),
      ).resolves.toEqual('project');
    });
  });

  describe('update', () => {
    it('should return a promise of a project', async () => {
      expect.assertions(1);
      await expect(
        projectController.update(mockId, mockUpdateProjectDto),
      ).resolves.toEqual('project');
    });
  });

  describe('toggle', () => {
    it('should return a promise of a project', async () => {
      expect.assertions(1);
      await expect(projectController.toggle(mockId)).resolves.toEqual(
        'project',
      );
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      expect.assertions(1);
      await expect(projectController.remove(mockId)).resolves.toBeUndefined();
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
      expect.assertions(1);
      await expect(projectController.findAll()).rejects.toThrowError();
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(projectController.findAllActive()).rejects.toThrowError();
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(projectController.findOne(mockId)).rejects.toThrowError();
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        projectController.findOneActive(mockId),
      ).rejects.toThrowError();
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        projectController.create(mockCreatProjectDto),
      ).rejects.toThrowError();
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(
        projectController.update(mockId, mockUpdateProjectDto),
      ).rejects.toThrowError();
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(projectController.toggle(mockId)).rejects.toThrowError();
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      expect.assertions(1);
      await expect(projectController.remove(mockId)).rejects.toThrowError();
    });
  });
});
