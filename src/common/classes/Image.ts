import { IsDataURI, IsNotEmpty } from 'class-validator';

export class Image {
  @IsNotEmpty()
  @IsDataURI()
  url: string;

  @IsNotEmpty()
  description: string;

  id?: string;
}
