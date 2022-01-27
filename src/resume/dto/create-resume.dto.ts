import { IsNotEmpty } from 'class-validator';

export class FileType {
  mimeType: string;

  extension: string;
}

export class CreateResumeDto {
  @IsNotEmpty()
  name: string;

  nameOnDisk: string;

  fileType: FileType;
}
