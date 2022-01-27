import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Body,
} from '@nestjs/common';

import { SkillsCategoriesService } from './skills-categories.service';
import { CreateSkillsCategoryDto } from './dto/create-skills-category.dto';
import { UpdateSkillsCategoryDto } from './dto/update-skills-category.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import {
  SkillsCategory,
  SkillsCategoryRefs,
} from './schemas/skills-category.schema';
import { SkillRefs } from '../skills/schemas/skill.schema';

@Controller('skills-categories')
export class SkillsCategoriesController {
  constructor(
    private readonly skillsCategoryService: SkillsCategoriesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<SkillsCategory[]> {
    return this.skillsCategoryService.findAll(
      {},
      {
        path: SkillsCategoryRefs.Skills,
        populate: { path: SkillRefs.Projects },
      },
    );
  }

  @Get('active')
  findAllActive(): Promise<SkillsCategory[]> {
    return this.skillsCategoryService.findAllActive(
      {},
      {
        path: SkillsCategoryRefs.Skills,
        match: { active: 1 },
        populate: { path: SkillRefs.Projects, match: { active: 1 } },
      },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<SkillsCategory> {
    return this.skillsCategoryService.findOne(
      id,
      {},
      {
        path: SkillsCategoryRefs.Skills,
        populate: { path: SkillRefs.Projects },
      },
    );
  }

  @Get('active/:id')
  findOneActive(@Param('id') id: string): Promise<SkillsCategory> {
    return this.skillsCategoryService.findOneActive(
      id,
      {},
      {
        path: SkillsCategoryRefs.Skills,
        match: { active: 1 },
        populate: { path: SkillRefs.Projects, match: { active: 1 } },
      },
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createSkillsCategoryDto: CreateSkillsCategoryDto,
  ): Promise<SkillsCategory> {
    return this.skillsCategoryService.create(createSkillsCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSkillsCategoryDto: UpdateSkillsCategoryDto,
  ): Promise<SkillsCategory> {
    return this.skillsCategoryService.update(id, updateSkillsCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  toggle(@Param('id') id: string): Promise<SkillsCategory> {
    return this.skillsCategoryService.toggle(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.skillsCategoryService.remove(id);
  }
}
