import { Test, TestingModule } from '@nestjs/testing';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { TaskListController } from './task-list.controller';
import { TaskListService } from './task-list.service';

describe('TaskListController', () => {
  let taskListController: TaskListController;
  let taskListService: TaskListService;
  const mockCreateTaskListDto: CreateTaskListDto = new CreateTaskListDto();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskListController],
      providers: [
        {
          provide: TaskListService,
          useValue: {
            findAll: jest.fn(() => Promise.resolve(['task'])),
            create: jest.fn(() => Promise.resolve('task')),
          },
        },
      ],
    }).compile();

    taskListController = module.get<TaskListController>(TaskListController);
    taskListService = module.get<TaskListService>(TaskListService);
  });

  describe('TaskListController', () => {
    it('should be defined', () => {
      expect(taskListController).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return a Promise of array of tasks', async () => {
      const result = await taskListController.findAll();
      expect(result).toEqual(['task']);
    });
    it('should throw an error', () => {
      taskListService.findAll = jest.fn(() => {
        throw new Error();
      });
      expect(taskListController.findAll).toThrowError();
    });
    it('get executed once', async () => {
      const spy = jest.spyOn(taskListController, 'findAll');
      await taskListController.findAll();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should return a Promise of task', async () => {
      const result = await taskListController.create(mockCreateTaskListDto);
      expect(result).toEqual('task');
    });
    it('should throw an error', () => {
      taskListService.create = jest.fn(() => {
        throw new Error();
      });
      expect(taskListController.create).toThrowError();
    });
    it('should run once', async () => {
      const spy = jest.spyOn(taskListController, 'create');
      await taskListController.create(mockCreateTaskListDto);
      expect(spy).toBeCalledTimes(1);
    });
  });
});
