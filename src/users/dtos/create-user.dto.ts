import { IsEmail, IsString } from 'class-validator';

import { CreateUserInput } from '@/graphql';

export class CreateUserDto implements CreateUserInput {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;
}
