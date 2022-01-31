import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { BcryptService } from '../bcrypt/bcrypt.service';
import { SafeUserDto } from '../users/dto/safe-user-credentials.dto';
import { UsersService } from '../users/users.service';
import { AuthTokenPayload } from './interfaces/auth-token-payload.interface';
import { AuthToken } from './interfaces/auth-token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<SafeUserDto> | null {
    const user = await this.userService.findOne({ username });
    if (user && (await this.bcryptService.compare(password, user.password))) {
      delete user.password;
      return user;
    } else {
      return null;
    }
  }

  signIn(user: SafeUserDto): AuthToken {
    const { username } = user;
    const payload: AuthTokenPayload = { username };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  async signUp(): Promise<void> {
    const username = this.configService.get('adminUserName');
    const password = this.configService.get('adminPassword');

    const hashedPassword = await this.bcryptService.generateHash(password);

    return this.userService.create({ username, password: hashedPassword });
  }
}
