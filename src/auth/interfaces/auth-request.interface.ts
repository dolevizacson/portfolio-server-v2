import { Request } from 'express';
import { SafeUserDto } from '../../users/dto/safe-user-credentials.dto';

export interface AuthRequest extends Request {
  user: SafeUserDto;
}
