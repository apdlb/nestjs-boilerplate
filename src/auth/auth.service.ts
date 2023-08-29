import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

import { CurrentAdmin, RoleEnum } from '@/common/types';
import { AuthType } from '@/graphql';
import { UsersService } from '@/users/users.service';

import { JwtPayload } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  private async verifyUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async signIn(email: string, password: string): Promise<AuthType> {
    const user = await this.verifyUser(email, password);

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

  async signInAdmin(email: string, password: string) {
    const user = await this.verifyUser(email, password);

    if (user.role !== RoleEnum.ADMIN) {
      throw new UnauthorizedException();
    }

    const payload: CurrentAdmin = {
      email: user.email,
      id: user.id,
    };

    return payload;
  }
}
