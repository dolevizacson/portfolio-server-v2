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

@Controller('task-list')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}

  @Get()
  findAll() {
    return this.taskListService.findAll();
  }

  @Get('/active')
  findAllActive() {
    return this.taskListService.findAllActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskListService.findOne(+id);
  }

  @Get(':id/active')
  findOneActive(@Param('id') id: string) {
    return this.taskListService.findOneActive(+id);
  }

  @Post()
  create(@Body() createTaskListDto: CreateTaskListDto) {
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
    return this.taskListService.update(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskListService.remove(+id);
  }
}
