import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, FilterQuery, Model } from 'mongoose';

import { FilesService } from '../file-uploader/files.service';
import { HelperFunctionsService } from '../utils/helper-functions.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume, ResumeDocument } from './schemas/resume.schema';

@Injectable()
export class ResumeService {
  constructor(
    @InjectModel(Resume.name)
    private readonly resumeModel: Model<ResumeDocument>,
    private readonly fileService: FilesService,
    @InjectConnection() private readonly connection: Connection,
    private readonly helperFunctionsService: HelperFunctionsService,
  ) {}
  findAll(): Promise<Resume[]> {
    return this.resumeModel.find().exec();
  }

  findAllActive(): Promise<Resume[]> {
    return this.resumeModel
      .find({ isActive: 1 } as FilterQuery<ResumeDocument>)
      .exec();
  }

  get(id: string): Promise<Resume> {
    return this.resumeModel.findById(id).exec();
  }

  add(createResumeDto: CreateResumeDto): Promise<Resume> {
    return this.resumeModel.create(createResumeDto);
  }

  update(id: string, updateResumeDto: UpdateResumeDto): Promise<Resume> {
    return this.resumeModel
      .findByIdAndUpdate(id, updateResumeDto, { new: true })
      .exec();
  }

  toggle(id: string): Promise<Resume> {
    return this.resumeModel
      .findByIdAndUpdate(
        id,
        {
          $bit: { isActive: { xor: 1 } },
        },
        { new: true },
      )
      .exec();
  }

  remove(id: string): Promise<void> {
    return this.helperFunctionsService.mongooseTransaction(
      this.connection,
      async (session) => {
        const { nameOnDisk } = await this.resumeModel
          .findById(id)
          .session(session)
          .exec();

        await this.fileService.remove('resume', nameOnDisk);

        await this.resumeModel.findByIdAndDelete(id).session(session).exec();
      },
    );
  }
}
