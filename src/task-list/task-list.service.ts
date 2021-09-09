import { Injectable } from '@nestjs/common';

import { CrudService } from '../common/mixins/crud-service.mixin';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
@Injectable()
export class TaskListService extends CrudService<
  Task,
  CreateTaskDto,
  UpdateTaskDto
>(Task) {}
