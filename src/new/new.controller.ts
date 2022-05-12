import {
  Controller,
  Get,
  Body,
  Delete,
  Put,
  Post,
  UseInterceptors,
  ValidationPipe,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { Image } from '../common/classes/Image';
import { BodyWithImage } from '../common/decorators/body-with-image.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { NewBlgPostDto } from './dto/new-blog-post.dto';
import { NewProjectDto } from './dto/new-project.dto';
import { NewSkillDto } from './dto/new-skill.dto';
import { NewSkillsCategoryDto } from './dto/new-skills-category.dto';
import { NewTaskDto } from './dto/new-task.dto';
import { NewService } from './new.service';
import { NewBlogPost } from './schemas/new-blog-post.schema';
import { NewProject } from './schemas/new-project.schema';
import { NewSkill } from './schemas/new-skill.schema';
import { NewSkillsCategory } from './schemas/new-skills-category.schema';
import { NewTask } from './schemas/new-task.schema';

@Controller('new')
@UseGuards(JwtAuthGuard)
export class NewController {
  constructor(private readonly newService: NewService) {}

  @Get('task')
  createNewTask(): Promise<NewTask> {
    return this.newService.createNew<NewTask>(NewTask);
  }

  @Put('task')
  updateNewTask(@Body() newTaskDto: NewTaskDto): Promise<NewTask> {
    return this.newService.updateNew<NewTask, NewTaskDto>(NewTask, newTaskDto);
  }

  @Delete('task')
  removeNewTask(): Promise<void> {
    return this.newService.removeNew<NewTask>(NewTask);
  }

  @Get('skill')
  createNewSkill(): Promise<NewSkill> {
    return this.newService.createNew<NewSkill>(NewSkill);
  }

  @Put('skill')
  updateNewSkill(@Body() newSkillDto: NewSkillDto): Promise<NewSkill> {
    return this.newService.updateNew<NewSkill, NewSkillDto>(
      NewSkill,
      newSkillDto,
    );
  }

  @Delete('skill')
  removeNewSkill(): Promise<void> {
    return this.newService.removeNew<NewSkill>(NewSkill);
  }

  @Get('skills-category')
  createNewSkillsCategory(): Promise<NewSkillsCategory> {
    return this.newService.createNew<NewSkillsCategory>(NewSkillsCategory);
  }

  @Put('skills-category')
  updateNewSkillsCategory(
    @Body() newSkillsCategoryDto: NewSkillsCategoryDto,
  ): Promise<NewSkillsCategory> {
    return this.newService.updateNew<NewSkillsCategory, NewSkillsCategoryDto>(
      NewSkillsCategory,
      newSkillsCategoryDto,
    );
  }

  @Delete('skills-category')
  removeNewSkillsCategory(): Promise<void> {
    return this.newService.removeNew<NewSkillsCategory>(NewSkillsCategory);
  }

  @Get('project')
  createNewProject(): Promise<NewProject> {
    return this.newService.createNew<NewProject>(NewProject);
  }

  @Put('project')
  updateNewProject(@Body() newProjectDto: NewProjectDto): Promise<NewProject> {
    return this.newService.updateNew<NewProject, NewProjectDto>(
      NewProject,
      newProjectDto,
    );
  }

  @Delete('project')
  removeNewProject(): Promise<void> {
    return this.newService.removeNewProject();
  }

  @UseInterceptors(AnyFilesInterceptor())
  @Post('project/image')
  addNewProjectImage(
    @BodyWithImage(new ValidationPipe({ validateCustomDecorators: true }))
    image: Image,
  ): Promise<NewProject> {
    return this.newService.addNewProjectImage(image);
  }

  @Delete('project/image/:id')
  removeNewProjectImage(@Param('id') id: string): Promise<void> {
    return this.newService.removeNewProjectImage(id);
  }

  @Get('blog-post')
  createNewBlogPost(): Promise<NewBlogPost> {
    return this.newService.createNew<NewBlogPost>(NewBlogPost);
  }

  @Put('blog-post')
  updateNewBlogPost(
    @Body() newBlgPostDto: NewBlgPostDto,
  ): Promise<NewBlogPost> {
    return this.newService.updateNew<NewBlogPost, NewBlgPostDto>(
      NewBlogPost,
      newBlgPostDto,
    );
  }

  @Delete('blog-post')
  removeNewBlogPost(): Promise<void> {
    return this.newService.removeNewBlogPost();
  }

  @UseInterceptors(AnyFilesInterceptor())
  @Post('blog-post/:id/image')
  addNewBlogPostParagraphImage(
    @Param('id') id: string,
    @BodyWithImage(new ValidationPipe({ validateCustomDecorators: true }))
    image: Image,
  ): Promise<NewBlogPost> {
    return this.newService.addNewBlogPostParagraphImage(id, image);
  }

  @Delete('blog-post/:id/image/:imageid')
  removeNewBlogPostParagraphImage(
    @Param('id') id: string,
    @Param('imageid') imageId: string,
  ): Promise<void> {
    return this.newService.removeNewBlogPostParagraphImage(id, imageId);
  }
}
