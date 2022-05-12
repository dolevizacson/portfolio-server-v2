import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as Fs from 'fs';
import { join } from 'path';

import { Libs } from '../common/enums/external-libs.enum';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { HelperFunctionsService } from '../utils/helper-functions.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeService } from './resume.service';
import { Resume } from './schemas/resume.schema';

@Controller('resume')
export class ResumeController {
  constructor(
    private readonly resumeService: ResumeService,
    private readonly helperFunctionsService: HelperFunctionsService,
    @Inject(Libs.fs) private readonly fs: typeof Fs,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Resume[]> {
    return this.resumeService.findAll();
  }

  @Get('active')
  findAllActive(): Promise<Resume[]> {
    return this.resumeService.findAllActive();
  }

  @Get(':id')
  async get(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ): Promise<StreamableFile> {
    const {
      name,
      nameOnDisk,
      fileType: { mimeType, extension },
    } = await this.resumeService.get(id);

    const resume = Fs.createReadStream(
      join(process.cwd(), `resume/${nameOnDisk}`),
    );
    res.set({
      'Content-Type': `${mimeType}`,
      'Content-Disposition': `attachment; filename="${name}.${extension}"`,
    });

    return new StreamableFile(resume);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './resume',
    }),
  )
  add(
    @UploadedFile() file: Express.Multer.File,
    @Body() createResume: CreateResumeDto,
  ): Promise<Resume> {
    return this.resumeService.add({
      ...createResume,
      nameOnDisk: file.filename,
      fileType: {
        mimeType: file.mimetype,
        extension: this.helperFunctionsService.getFileExtensionFromMimeType(
          file.mimetype,
        ),
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateResumeDto: UpdateResumeDto,
  ): Promise<Resume> {
    return this.resumeService.update(id, updateResumeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  toggle(@Param('id') id: string): Promise<Resume> {
    return this.resumeService.toggle(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.resumeService.remove(id);
  }
}
