import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';

import { JwtUser } from '@/auth/auth.types';
import { CurrentUser } from '@/common/decorators';
import { UserType } from '@/graphql';

import { CreateUserDto, UpdateUserDto } from './dtos';
import { UsersService } from './users.service';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserType)
  createUser(@Args('input') createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Query(() => [UserType], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserType, { name: 'user' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserType)
  updateUser(@Args('input') updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @Mutation(() => UserType)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }

  @Query(() => UserType, { name: 'me' })
  findMe(@CurrentUser() user: JwtUser) {
    return this.usersService.findOne(user.id);
  }
}
