import { IsEmail, IsString } from 'class-validator';

import { SignInInput } from '@/graphql';

export class SignInDto implements SignInInput {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
