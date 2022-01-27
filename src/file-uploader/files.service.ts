import { Inject, Injectable } from '@nestjs/common';
import * as Fs from 'fs/promises';
import { join } from 'path';

import { Libs } from '../common/enums/external-libs.enum';

@Injectable()
export class FilesService {
  constructor(@Inject(Libs.fs) private readonly fs: typeof Fs) {}

  async remove(path: string, filename?: string): Promise<void> {
    if (!path) {
      throw new Error();
    }

    let pathToRemove = join(process.cwd(), path);

    if (filename) {
      pathToRemove = join(pathToRemove, filename);
    }

    await this.fs.unlink(pathToRemove);
  }
}
