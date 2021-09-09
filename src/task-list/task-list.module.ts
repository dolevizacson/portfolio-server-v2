import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TaskListService } from './task-list.service';
import { TaskListController } from './task-list.controller';
import { Task, TaskSchema } from './schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [TaskListService],
  controllers: [TaskListController],
})
export class TaskListModule {}
