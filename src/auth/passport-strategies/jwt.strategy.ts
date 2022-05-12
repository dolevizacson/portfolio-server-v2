import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

import { AuthTokenPayload } from '../interfaces/auth-token-payload.interface';
import { HelperFunctionsService } from '../../utils/helper-functions.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly helperFunctionsService: HelperFunctionsService,
  ) {
    super({
      jwtFromRequest: helperFunctionsService.getTokenFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtOptions.secret'),
    });
  }

  async validate(payload: AuthTokenPayload) {
    return { ...payload };
  }
}
