import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { AuthRequest } from './interfaces/auth-request.interface';

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
  ): void {
    const authToken = this.authService.signIn(request.user);
    response.cookie(
      this.configService.get('cookieJwtKey'),
      authToken.access_token,
      this.configService.get('cookieJwtOptions'),
    );
  }

  @Get('signout')
  signOut(@Res({ passthrough: true }) response: Response): void {
    response.clearCookie(this.configService.get('cookieJwtKey'));
  }

  @Get('signup')
  signUp(): Promise<void> {
    return this.authService.signUp();
  }

  @Get('isloggedin')
  isLoggedIn(@Req() request: Request): boolean {
    return this.authService.isLoggedIn(request);
  }
}
