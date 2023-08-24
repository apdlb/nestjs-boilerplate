import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '@/prisma/prisma.service';

import { CreateUserDto, UpdateUserDto } from './dtos';

@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        role: 'USER',
        ...createUserDto,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: string): Promise<User> | null {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
