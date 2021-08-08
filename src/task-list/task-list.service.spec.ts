import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { TaskList } from './entities/task-list.entity';
import { TaskListService } from './task-list.service';

describe('TaskListService', () => {
  let taskListService: TaskListService;
  let taskListRepository: Repository<TaskList>;
  const mockCreateTaskListDto: CreateTaskListDto = new CreateTaskListDto();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskListService,
        {
          provide: getRepositoryToken(TaskList),
          useValue: {
            find: jest.fn(() => Promise.resolve(['task'])),
            save: jest.fn(() => Promise.resolve('task')),
          },
        },
      ],
    }).compile();

    taskListService = module.get<TaskListService>(TaskListService);
    taskListRepository = module.get<Repository<TaskList>>(
      getRepositoryToken(TaskList),
    );
  });

  describe('TaskListService', () => {
    it('should be defined', () => {
      expect(taskListService).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return a promise of array of tasks', async () => {
      const result = await taskListService.findAll();
      expect(result).toEqual(['task']);
    });
    it('should throw an error', () => {
      taskListRepository.find = jest.fn(() => {
        throw new Error();
      });
      expect(taskListService.findAll).toThrowError();
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(taskListService, 'findAll');
      await taskListService.findAll();
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should return a promise of a task', async () => {
      const result = await taskListService.create(mockCreateTaskListDto);
      expect(result).toEqual('task');
    });
    it('should throw an error', () => {
      taskListRepository.create = jest.fn(() => {
        throw new Error();
      });
      expect(taskListService.create).toThrowError();
    });
    it('should be executed once', async () => {
      const spy = jest.spyOn(taskListService, 'create');
      await taskListService.create(mockCreateTaskListDto);
      expect(spy).toBeCalledTimes(1);
    });
  });
});
