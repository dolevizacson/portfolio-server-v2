import { Inject, Injectable } from '@nestjs/common';

import { libs } from '../common/enums/external-libs.enum';

@Injectable()
export class BcryptService {
  constructor(@Inject(libs.bcrypt) private readonly bcrypt) {}

  compare(password: string, hashedPassword: string): Promise<boolean> {
    return this.bcrypt.compare(password, hashedPassword);
  }

  async generateHash(password: string): Promise<string> {
    const salt = await this.bcrypt.genSalt();
    return await this.bcrypt.hash(password, salt);
  }
}
