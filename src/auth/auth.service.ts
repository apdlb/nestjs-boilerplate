import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { AuthType } from '@/graphql';
import { UsersService } from '@/users/users.service';

import { JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async signIn(email: string, password: string): Promise<AuthType> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      ok: true,
      accessToken,
    };
  }
}
