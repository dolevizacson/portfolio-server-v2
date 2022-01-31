import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { AuthRequest } from './interfaces/auth-request.interface';
import { AuthToken } from './interfaces/auth-token.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signIn(
    @Req() request: AuthRequest,
    @Res({ passthrough: true }) response: Response,
  ): AuthToken {
    const authToken = this.authService.signIn(request.user);
    response.cookie(
      this.configService.get('cookieJwtKey'),
      authToken.access_token,
      this.configService.get('cookieJwtOptions'),
    );
    return authToken;
  }

  @Get('/signout')
  signOut(@Res({ passthrough: true }) response: Response): void {
    response.clearCookie(this.configService.get('cookieJwtKey'));
  }

  @Get('signup')
  signUp(): Promise<void> {
    return this.authService.signUp();
  }
}
