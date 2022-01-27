import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project, ProjectRefs } from './schemas/project.schema';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Image } from '../common/classes/Image';
import { BodyWithImage } from '../common/decorators/body-with-image.decorator';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll({}, { path: ProjectRefs.Technologies });
  }

  @Get('active')
  findAllActive(): Promise<Project[]> {
    return this.projectsService.findAllActive(
      {},
      { path: ProjectRefs.Technologies, match: { active: 1 } },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOne(
      id,
      {},
      { path: ProjectRefs.Technologies },
    );
  }

  @Get('active/:id')
  findOneActive(@Param('id') id: string): Promise<Project> {
    return this.projectsService.findOneActive(
      id,
      {},
      { path: ProjectRefs.Technologies, match: { active: 1 } },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body()
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,

    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  toggle(@Param('id') id: string): Promise<Project> {
    return this.projectsService.toggle(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @Post(':id/image')
  createImage(
    @Param('id') id: string,
    @BodyWithImage(new ValidationPipe({ validateCustomDecorators: true }))
    image: Image,
  ): Promise<Project> {
    return this.projectsService.createImage(id, image);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/image/:image-id')
  removeIgame(
    @Param('id') id: string,
    @Param('image-id') imageId: string,
  ): Promise<void> {
    return this.projectsService.removeImage(id, imageId);
  }
}
