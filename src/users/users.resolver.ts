import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { AuthGuard } from '@/auth/auth.guard';
import { JwtPayload } from '@/auth/auth.types';
import { AuthUser } from '@/common/decorators';

import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User, { name: 'me' })
  @UseGuards(AuthGuard)
  findMe(@AuthUser() user: JwtPayload) {
    return this.usersService.findOne(user.sub);
  }

  @Mutation(() => User)
  createUser(@Args('input') createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(@Args('input') updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }
}
