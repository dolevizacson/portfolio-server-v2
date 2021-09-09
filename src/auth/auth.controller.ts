import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { AuthRequest } from './interfaces/auth-request.interface';
import { AuthToken } from './interfaces/auth-token.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signIn(@Req() request: AuthRequest): AuthToken {
    return this.authService.signIn(request.user);
  }

  // @Get('/signout')
  // signOut(): Promise<void> {
  //   return this.authService.signOut();
  // }

  @Get('signup')
  signUp(): Promise<void> {
    return this.authService.signUp();
  }
}
