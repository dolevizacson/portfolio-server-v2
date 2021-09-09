import { OmitType } from '@nestjs/mapped-types';

import { User } from '../schemas/user.schema';

export class SafeUserDto extends OmitType(User, ['password'] as const) {
  iat?: number;
  exp?: number;
}
