import { Test, TestingModule } from '@nestjs/testing';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskListController } from './task-list.controller';
import { TaskListService } from './task-list.service';

let taskListController: TaskListController;
const mockCreateTaskDto = new CreateTaskDto();
const mockUpdateTaskDto = new UpdateTaskDto();
const mockId = 'mockId';

describe('TaskListController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskListController],
      providers: [
        {
          provide: TaskListService,
          useValue: {
            findAll: jest.fn(() => Promise.resolve(['task'])),
            findAllActive: jest.fn(() => Promise.resolve(['task'])),
            findOne: jest.fn(() => Promise.resolve('task')),
            findOneActive: jest.fn(() => Promise.resolve('task')),
            update: jest.fn(() => Promise.resolve('task')),
            toggle: jest.fn(() => Promise.resolve('task')),
            create: jest.fn(() => Promise.resolve('task')),
            remove: jest.fn(() => Promise.resolve()),
          },
        },
      ],
    }).compile();

    taskListController = module.get<TaskListController>(TaskListController);
  });

  it('should be defined', () => {
    expect(taskListController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a promise of array of tasks', async () => {
      await expect(taskListController.findAll()).resolves.toEqual(['task']);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(taskListController, 'findAll');
      await taskListController.findAll();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of tasks', async () => {
      await expect(taskListController.findAllActive()).resolves.toEqual([
        'task',
      ]);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(taskListController, 'findAllActive');
      await taskListController.findAllActive();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a task', async () => {
      expect(taskListController.findOne(mockId)).resolves.toEqual('task');
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(taskListController, 'findOne');
      await taskListController.findOne(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a task', async () => {
      await expect(taskListController.findOneActive(mockId)).resolves.toEqual(
        'task',
      );
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(taskListController, 'findOneActive');
      await taskListController.findOneActive(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should return a promise of task', async () => {
      await expect(
        taskListController.create(mockCreateTaskDto),
      ).resolves.toEqual('task');
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(taskListController, 'create');
      await taskListController.create(mockCreateTaskDto);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should return a promise of a task', async () => {
      await expect(
        taskListController.update(mockId, mockUpdateTaskDto),
      ).resolves.toEqual('task');
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(taskListController, 'update');
      await taskListController.update(mockId, mockUpdateTaskDto);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('toggle', () => {
    it('should return a promise of a task', async () => {
      await expect(taskListController.toggle(mockId)).resolves.toEqual('task');
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(taskListController, 'toggle');
      await taskListController.toggle(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      await expect(taskListController.remove(mockId)).resolves.toBeUndefined();
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(taskListController, 'remove');
      await taskListController.remove(mockId);
      expect(spy).toBeCalledTimes(1);
    });
  });
});

describe('TaskListController errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskListController],
      providers: [
        {
          provide: TaskListService,
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

    taskListController = module.get<TaskListController>(TaskListController);
  });

  it('should be defined', () => {
    expect(taskListController).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      await expect(taskListController.findAll()).rejects.toThrowError();
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      await expect(taskListController.findAllActive()).rejects.toThrowError();
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      expect(taskListController.findOne(mockId)).rejects.toThrowError();
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      await expect(
        taskListController.findOneActive(mockId),
      ).rejects.toThrowError();
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      await expect(
        taskListController.create(mockCreateTaskDto),
      ).rejects.toThrowError();
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      await expect(
        taskListController.update(mockId, mockUpdateTaskDto),
      ).rejects.toThrowError();
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      await expect(taskListController.toggle(mockId)).rejects.toThrowError();
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      await expect(taskListController.remove(mockId)).rejects.toThrowError();
    });
  });
});
