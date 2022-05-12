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

import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Skill, SkillRefs } from './schemas/skill.schema';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Skill[]> {
    return this.skillsService.findAll();
  }

  @Get('active')
  findAllActive(): Promise<Skill[]> {
    return this.skillsService.findAllActive();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Skill> {
    return this.skillsService.findOne(
      id,
      {},
      { path: SkillRefs.SkillsCategory },
    );
  }

  @Get('active/:id')
  findOneActive(@Param('id') id: string): Promise<Skill> {
    return this.skillsService.findOneActive(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSkillDto: CreateSkillDto): Promise<Skill> {
    return this.skillsService.create(createSkillDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<Skill> {
    return this.skillsService.update(id, updateSkillDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  toggle(@Param('id') id: string): Promise<Skill> {
    return this.skillsService.toggle(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.skillsService.remove(id);
  }
}
