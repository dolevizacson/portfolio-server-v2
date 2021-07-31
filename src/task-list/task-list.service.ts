import { Injectable } from '@nestjs/common';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';

@Injectable()
export class TaskListService {
  findAll() {
    return `This action returns all taskList`;
  }

  findAllActive() {
    return `This action returns all taskList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskList`;
  }

  findOneActive(id: number) {
    return `This action returns a #${id} taskList`;
  }

  create(createTaskListDto: CreateTaskListDto) {
    return 'This action adds a new taskList';
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
