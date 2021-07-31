import { Module } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { TaskListController } from './task-list.controller';

@Module({
  controllers: [TaskListController],
  providers: [TaskListService],
})
export class TaskListModule {}
