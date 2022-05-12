import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { Skill, SkillSchema } from './schemas/skill.schema';
import { SkillsCategoriesModule } from '../skills-categories/skills-categories.module';
import { ProjectsModule } from '../projects/projects.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
    forwardRef(() => SkillsCategoriesModule),
    forwardRef(() => ProjectsModule),
    UtilsModule,
  ],
  controllers: [SkillsController],
  providers: [SkillsService],
  exports: [MongooseModule],
})
export class SkillsModule {}
