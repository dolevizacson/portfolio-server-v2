import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';
import { Skill, SkillSchema } from './schemas/skill.schema';
import { SkillsCategoriesModule } from '../skills-categories/skills-categories.module';
import { ProjectsModule } from '../projects/projects.module';
import * as helpers from '../common/functions/helpers/helpers.functions';
import * as serviceFunctions from '../common/functions/services/services.functions';
import { CommonFiles } from '../common/enums/common-files.enum';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
    forwardRef(() => SkillsCategoriesModule),
    forwardRef(() => ProjectsModule),
  ],
  controllers: [SkillsController],
  providers: [
    SkillsService,
    { provide: CommonFiles.helpers, useValue: helpers },
    { provide: CommonFiles.services, useValue: serviceFunctions },
  ],
  exports: [MongooseModule],
})
export class SkillsModule {}
