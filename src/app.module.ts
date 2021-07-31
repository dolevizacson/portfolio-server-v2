import { Module } from '@nestjs/common';
import { TaskListModule } from './task-list/task-list.module';

@Module({
  imports: [TaskListModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
