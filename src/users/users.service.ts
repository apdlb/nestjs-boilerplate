import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '@/prisma/prisma.service';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        role: 'USER',
        ...createUserInput,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: updateUserInput,
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
