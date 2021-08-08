import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskList } from './entities/task-list.entity';
import { Repository } from 'typeorm';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
@Injectable()
export class TaskListService {
  constructor(
    @InjectRepository(TaskList)
    private readonly taskListRepository: Repository<TaskList>,
  ) {}

  findAll(): Promise<TaskList[]> {
    return this.taskListRepository.find();
  }

  findAllActive() {
    return `This action returns all taskList`;
  }

  findOne(id: number): Promise<TaskList> {
    return this.taskListRepository.findOne(id);
  }

  findOneActive(id: number) {
    return `This action returns a #${id} taskList`;
  }

  create(createTaskListDto: CreateTaskListDto): Promise<TaskList> {
    return this.taskListRepository.save(createTaskListDto);
  }

  update(id: number, updateTaskListDto: UpdateTaskListDto) {
    return `This action updates a #${id} taskList`;
  }

  toggle(id: number) {
    return `This action updates a #${id} taskList`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskList`;
  }
}
