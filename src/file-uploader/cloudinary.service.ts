import { Inject, Injectable } from '@nestjs/common';
import * as Cloudinary from 'cloudinary';

import { Libs } from '../common/enums/external-libs.enum';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject(Libs.cloudinary) private readonly cloudinary: typeof Cloudinary,
  ) {}

  async uploadImage(
    file: string,
    collection?: string,
  ): Promise<Cloudinary.UploadApiResponse> {
    const options: Cloudinary.UploadApiOptions = {
      eager: [
        {
          width: 200,
          height: 200,
          crop: 'fill',
        },
        {
          width: 400,
          height: 400,
          crop: 'fill',
        },
        {
          width: 800,
          height: 800,
          crop: 'fill',
        },
        {
          width: 1200,
          height: 1200,
          crop: 'fill',
        },
        {
          width: 1600,
          height: 1600,
          crop: 'fill',
        },
        {
          width: 200,
          crop: 'scale',
        },
        {
          width: 400,
          crop: 'scale',
        },
        {
          width: 800,
          crop: 'scale',
        },
        {
          width: 1200,
          crop: 'scale',
        },
        {
          width: 1600,
          crop: 'scale',
        },
      ],
      eager_async: true,
    };

    if (collection) {
      options.folder = collection;
    }

    return await this.cloudinary.v2.uploader.upload(file, options);
  }

  async deleteImage(id: string): Promise<void> {
    await this.cloudinary.v2.uploader.destroy(id);
  }

  async renameImage(oldId: string, newId: string): Promise<string> {
    return await this.cloudinary.v2.uploader.rename(oldId, newId);
  }

  async deleteFolder(name: string): Promise<void> {
    await this.cloudinary.v2.api.delete_resources_by_prefix(name);
    await this.cloudinary.v2.api.delete_folder(name);
  }
}
