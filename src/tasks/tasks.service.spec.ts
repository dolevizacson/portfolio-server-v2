import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { HelperFunctionsService } from '../utils/helper-functions.service';
import { ServiceFunctionService } from '../utils/service-functions.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import { TasksService } from './tasks.service';

let tasksService: TasksService;
const mockCreateTaskDto = new CreateTaskDto();
const mockUpdateTaskDto = new UpdateTaskDto();
const mockId = 'mockId';

describe('TasksService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: {
            find: jest.fn(() => {
              return { exec: jest.fn(() => Promise.resolve(['task'])) };
            }),
            findById: jest.fn(() => {
              return { exec: jest.fn(() => Promise.resolve('task')) };
            }),
            findOne: jest.fn(() => {
              return { exec: jest.fn(() => Promise.resolve('task')) };
            }),
            findByIdAndUpdate: jest.fn(() => {
              return { exec: jest.fn(() => Promise.resolve('task')) };
            }),
            findByIdAndDelete: jest.fn(() => {
              return { exec: jest.fn(() => Promise.resolve('task')) };
            }),
            create: jest.fn(() => Promise.resolve('task')),
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
            getNewDocument: jest.fn(() =>
              Promise.resolve({
                save: jest.fn(() => Promise.resolve()),
              }),
            ),
          },
        },
      ],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a promise of array of tasks', async () => {
      await expect(tasksService.findAll()).resolves.toEqual(['task']);
      expect.assertions(1);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of tasks', async () => {
      await expect(tasksService.findAllActive()).resolves.toEqual(['task']);
      expect.assertions(1);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a task', async () => {
      await expect(tasksService.findOne(mockId)).resolves.toEqual('task');
      expect.assertions(1);
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a task', async () => {
      await expect(tasksService.findOneActive(mockId)).resolves.toEqual('task');
      expect.assertions(1);
    });
  });

  describe('create', () => {
    it('should return a promise of a task', async () => {
      await expect(tasksService.create(mockCreateTaskDto)).resolves.toEqual(
        'task',
      );
      expect.assertions(1);
    });
  });

  describe('update', () => {
    it('should return a promise of a task', async () => {
      await expect(
        tasksService.update(mockId, mockUpdateTaskDto),
      ).resolves.toEqual('task');
      expect.assertions(1);
    });
  });

  describe('toggle', () => {
    it('should return a promise of a task', async () => {
      await expect(tasksService.toggle(mockId)).resolves.toEqual('task');
      expect.assertions(1);
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      await expect(tasksService.remove(mockId)).resolves.toBeUndefined();
      expect.assertions(1);
    });
  });
});

describe('TaskListService errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
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
            mongooseTransaction: jest.fn(
              async (connection, callback) => await callback(),
            ),
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

    tasksService = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(tasksService).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      await expect(tasksService.findAll()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      await expect(tasksService.findAllActive()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      await expect(tasksService.findOne(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      await expect(tasksService.findOneActive(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      await expect(
        tasksService.create(mockCreateTaskDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      await expect(
        tasksService.update(mockId, mockUpdateTaskDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      await expect(tasksService.toggle(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      await expect(tasksService.remove(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
