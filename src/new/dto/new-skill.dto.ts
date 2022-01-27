import { PartialType } from '@nestjs/mapped-types';

import { CreateSkillDto } from '../../skills/dto/create-skill.dto';

export class NewSkillDto extends PartialType(CreateSkillDto) {}
