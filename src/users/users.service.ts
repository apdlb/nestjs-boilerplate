import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

import { CreateUserDto, UpdateUserDto } from './dtos';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async hashPassword(password: string) {
    const hash = await argon2.hash(password);

    return hash;
  }

  async create({ password, ...createUserDto }: CreateUserDto) {
    const hashedPassword = await this.hashPassword(password);

    return this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  findAll() {
    return this.usersRepository.findAll();
  }

  findOne(id: string) {
    return this.usersRepository.findOne(id);
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneByEmail(email);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.usersRepository.remove(id);
  }
}
