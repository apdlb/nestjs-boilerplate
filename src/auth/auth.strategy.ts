import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtPayload, JwtUser } from './auth.types';

const cookieExtractor = (request: Request) => {
  if (request && request.cookies) {
    const accessToken = request.cookies['accessToken'];

    return accessToken;
  }

  return null;
};

const jwtFromRequest = (request: Request) => {
  const headers = request.headers;
  const userAgent = headers['user-agent'];

  if (userAgent.includes('Mozilla')) {
    return cookieExtractor(request);
  }

  if (userAgent.includes('Mobile')) {
    return ExtractJwt.fromAuthHeaderAsBearerToken();
  }

  return null;
};

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<JwtUser> {
    return { id: payload.sub, email: payload.email };
  }
}
