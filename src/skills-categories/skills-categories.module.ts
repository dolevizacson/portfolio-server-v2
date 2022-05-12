import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SkillsCategoriesService } from './skills-categories.service';
import { SkillsCategoriesController } from './skills-categories.controller';
import {
  SkillsCategory,
  SkillsCategorySchema,
} from './schemas/skills-category.schema';
import { SkillsModule } from '../skills/skills.module';
import { ProjectsModule } from '../projects/projects.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SkillsCategory.name, schema: SkillsCategorySchema },
    ]),
    forwardRef(() => SkillsModule),
    forwardRef(() => ProjectsModule),
    UtilsModule,
  ],
  controllers: [SkillsCategoriesController],
  providers: [SkillsCategoriesService],
  exports: [MongooseModule],
})
export class SkillsCategoriesModule {}
