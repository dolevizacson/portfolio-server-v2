import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateTaskListDto } from './dto/create-task-list.dto';
import { UpdateTaskListDto } from './dto/update-task-list.dto';
import { TaskList } from './entities/task-list.entity';

@Controller('task-list')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Get()
  findAll(): Promise<TaskList[]> {
    return this.taskListService.findAll();
  }

  @Get('/active')
  findAllActive() {
    return this.taskListService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<TaskList> {
    return this.taskListService.findOne(+id);
  }

  @Get(':id/active')
  findOneActive(@Param('id') id: string) {
    return this.taskListService.findOneActive(+id);
  }

  @Post()
  create(@Body() createTaskListDto: CreateTaskListDto): Promise<TaskList> {
    return this.taskListService.create(createTaskListDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskListDto: UpdateTaskListDto,
  ) {
    return this.taskListService.update(+id, updateTaskListDto);
  }

  @Patch(':id')
  toggle(@Param('id') id: string) {
    return this.taskListService.toggle(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskListService.remove(+id);
  }
}
