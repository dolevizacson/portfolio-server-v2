import { Module } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { Libs } from '../common/enums/external-libs.enum';
import { BcryptService } from './bcrypt.service';

@Module({
  providers: [
    BcryptService,
    {
      provide: Libs.bcrypt,
      useValue: bcrypt,
    },
  ],
  exports: [BcryptService],
})
export class BcryptModule {}
