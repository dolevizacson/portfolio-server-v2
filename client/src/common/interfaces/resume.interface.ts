import { Base } from './base.interface';

export interface Resume extends Base {
  _id: string;
  name: string;
  nameOnDisk: string;
  fileType: FileType;
}

interface FileType {
  mimeType: string;
  extension: string;
}
