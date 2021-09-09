import { Injectable } from '@nestjs/common';

import { CrudService } from '../common/mixins/crud-service.mixin';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectsService extends CrudService<
  Project,
  CreateProjectDto,
  UpdateProjectDto
>(Project) {}
