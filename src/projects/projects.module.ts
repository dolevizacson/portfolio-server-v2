import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project, ProjectSchema } from './schemas/project.schema';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';
import { SkillsModule } from '../skills/skills.module';
import * as helpers from '../common/functions/helpers/helpers.functions';
import { CommonFiles } from '../common/enums/common-files.enum';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    FileUploaderModule,
    forwardRef(() => SkillsModule),
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    {
      provide: CommonFiles.helpers,
      useValue: helpers,
    },
  ],
  exports: [MongooseModule],
})
export class ProjectsModule {}
