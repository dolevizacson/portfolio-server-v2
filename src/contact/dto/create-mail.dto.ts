import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateMailDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  from: string;

  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  text: string;
}
