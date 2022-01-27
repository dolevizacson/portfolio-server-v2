import { PartialType } from '@nestjs/mapped-types';

import { CreateSkillsCategoryDto } from '../../skills-categories/dto/create-skills-category.dto';

export class NewSkillsCategoryDto extends PartialType(
  CreateSkillsCategoryDto,
) {}
