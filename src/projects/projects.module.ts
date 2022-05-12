import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project, ProjectSchema } from './schemas/project.schema';
import { FileUploaderModule } from '../file-uploader/file-uploader.module';
import { SkillsModule } from '../skills/skills.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    FileUploaderModule,
    forwardRef(() => SkillsModule),
    UtilsModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [MongooseModule],
})
export class ProjectsModule {}
