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
import * as helpers from '../common/functions/helpers/helpers.functions';
import * as serviceFunctions from '../common/functions/services/services.functions';
import { CommonFiles } from '../common/enums/common-files.enum';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SkillsCategory.name, schema: SkillsCategorySchema },
    ]),
    forwardRef(() => SkillsModule),
    forwardRef(() => ProjectsModule),
  ],
  controllers: [SkillsCategoriesController],
  providers: [
    SkillsCategoriesService,
    { provide: CommonFiles.helpers, useValue: helpers },
    { provide: CommonFiles.services, useValue: serviceFunctions },
  ],
  exports: [MongooseModule],
})
export class SkillsCategoriesModule {}
