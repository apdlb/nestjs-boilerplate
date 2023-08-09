import { Module } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { UsersService } from '@/users/users.service';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthResolver, AuthService, UsersService, PrismaService],
})
export class AuthModule {}
