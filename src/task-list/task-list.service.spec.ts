import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
import { TaskListService } from './task-list.service';

let taskListService: TaskListService;
const mockCreateTaskDto = new CreateTaskDto();
const mockUpdateTaskDto = new UpdateTaskDto();
const mockId = 'mockId';

describe('TaskListService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskListService,
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
      ],
    }).compile();

    taskListService = module.get<TaskListService>(TaskListService);
  });

  it('should be defined', () => {
    expect(taskListService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a promise of array of tasks', async () => {
      await expect(taskListService.findAll()).resolves.toEqual(['task']);
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(taskListService, 'findAll');
      await taskListService.findAll();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of tasks', async () => {
      await expect(taskListService.findAllActive()).resolves.toEqual(['task']);
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(taskListService, 'findAllActive');
      await taskListService.findAllActive();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a task', async () => {
      await expect(taskListService.findOne(mockId)).resolves.toEqual('task');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(taskListService, 'findOne');
      await taskListService.findOne(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a task', async () => {
      await expect(taskListService.findOneActive(mockId)).resolves.toEqual(
        'task',
      );
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(taskListService, 'findOneActive');
      await taskListService.findOneActive(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should return a promise of a task', async () => {
      await expect(taskListService.create(mockCreateTaskDto)).resolves.toEqual(
        'task',
      );
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(taskListService, 'create');
      await taskListService.create(mockCreateTaskDto);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a promise of a task', async () => {
      await expect(
        taskListService.update(mockId, mockUpdateTaskDto),
      ).resolves.toEqual('task');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(taskListService, 'update');
      await taskListService.update(mockId, mockUpdateTaskDto);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('toggle', () => {
    it('should return a promise of a task', async () => {
      await expect(taskListService.toggle(mockId)).resolves.toEqual('task');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(taskListService, 'toggle');
      await taskListService.toggle(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      await expect(taskListService.remove(mockId)).resolves.toBeUndefined();
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(taskListService, 'remove');
      await taskListService.remove(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });
});

describe('TaskListService errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskListService,
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
      ],
    }).compile();

    taskListService = module.get<TaskListService>(TaskListService);
  });

  it('should be defined', () => {
    expect(taskListService).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      await expect(taskListService.findAll()).rejects.toThrowError();
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      await expect(taskListService.findAllActive()).rejects.toThrowError();
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      await expect(taskListService.findOne(mockId)).rejects.toThrowError();
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      await expect(
        taskListService.findOneActive(mockId),
      ).rejects.toThrowError();
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      await expect(
        taskListService.create(mockCreateTaskDto),
      ).rejects.toThrowError();
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      await expect(
        taskListService.update(mockId, mockUpdateTaskDto),
      ).rejects.toThrowError();
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      await expect(taskListService.toggle(mockId)).rejects.toThrowError();
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      await expect(taskListService.remove(mockId)).rejects.toThrowError();
    });
  });
});
