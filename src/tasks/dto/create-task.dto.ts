import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  header: string;

  @IsNotEmpty()
  description: string;
}
