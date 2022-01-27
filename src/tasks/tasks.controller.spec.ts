import { Test, TestingModule } from '@nestjs/testing';

import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

let tasksController: TasksController;
const mockCreateTaskDto = new CreateTaskDto();
const mockUpdateTaskDto = new UpdateTaskDto();
const mockId = 'mockId';

describe('TasksController', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
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

    tasksController = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a promise of array of tasks', async () => {
      await expect(tasksController.findAll()).resolves.toEqual(['task']);
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(tasksController, 'findAll');
      await tasksController.findAll();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('findAllActive', () => {
    it('should return a promise of array of tasks', async () => {
      await expect(tasksController.findAllActive()).resolves.toEqual(['task']);
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(tasksController, 'findAllActive');
      await tasksController.findAllActive();
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('findOne', () => {
    it('should return a promise of a task', async () => {
      expect(tasksController.findOne(mockId)).resolves.toEqual('task');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(tasksController, 'findOne');
      await tasksController.findOne(mockId);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('findOneActive', () => {
    it('should return a promise of a task', async () => {
      await expect(tasksController.findOneActive(mockId)).resolves.toEqual(
        'task',
      );
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(tasksController, 'findOneActive');
      await tasksController.findOneActive(mockId);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('create', () => {
    it('should return a promise of task', async () => {
      await expect(tasksController.create(mockCreateTaskDto)).resolves.toEqual(
        'task',
      );
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(tasksController, 'create');
      await tasksController.create(mockCreateTaskDto);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('update', () => {
    it('should return a promise of a task', async () => {
      await expect(
        tasksController.update(mockId, mockUpdateTaskDto),
      ).resolves.toEqual('task');
      expect.assertions(1);
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(tasksController, 'update');
      await tasksController.update(mockId, mockUpdateTaskDto);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('toggle', () => {
    it('should return a promise of a task', async () => {
      await expect(tasksController.toggle(mockId)).resolves.toEqual('task');
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(tasksController, 'toggle');
      await tasksController.toggle(mockId);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });

  describe('remove', () => {
    it('should return a promise of void', async () => {
      await expect(tasksController.remove(mockId)).resolves.toBeUndefined();
      expect.assertions(1);
    });
    it('should get executed once', async () => {
      const spy = jest.spyOn(tasksController, 'remove');
      await tasksController.remove(mockId);
      expect(spy).toBeCalledTimes(1);
      expect.assertions(1);
    });
  });
});

describe('TasksController errors', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
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

    tasksController = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(tasksController).toBeDefined();
  });

  describe('findAll with error', () => {
    it('should throw an error', async () => {
      await expect(tasksController.findAll()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findAllActive with error', () => {
    it('should throw an error', async () => {
      await expect(tasksController.findAllActive()).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findOne with error', () => {
    it('should throw an error', async () => {
      expect(tasksController.findOne(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('findOneActive with error', () => {
    it('should throw an error', async () => {
      await expect(
        tasksController.findOneActive(mockId),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('create with error', () => {
    it('should throw an error', async () => {
      await expect(
        tasksController.create(mockCreateTaskDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('update with error', () => {
    it('should throw an error', async () => {
      await expect(
        tasksController.update(mockId, mockUpdateTaskDto),
      ).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('toggle with error', () => {
    it('should throw an error', async () => {
      await expect(tasksController.toggle(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });

  describe('remove with error', () => {
    it('should throw an error', async () => {
      await expect(tasksController.remove(mockId)).rejects.toThrowError();
      expect.assertions(1);
    });
  });
});
