import { Injectable } from '@nestjs/common';

import { CrudService } from '../common/mixins/crud-service.mixin';
import { NewTask } from '../new/schemas/new-task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './schemas/task.schema';
@Injectable()
export class TasksService extends CrudService<
  Task,
  NewTask,
  CreateTaskDto,
  UpdateTaskDto
>(Task, NewTask) {}
