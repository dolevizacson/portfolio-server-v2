import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Request } from 'express';

import { AuthTokenPayload } from '../interfaces/auth-token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        let token = null;
        if (req?.cookies) {
          token = req.cookies[configService.get('cookieJwtKey')];
        }
        return token;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get('jwtOptions.secret'),
    });
  }

  async validate(payload: AuthTokenPayload) {
    return { ...payload };
  }
}
