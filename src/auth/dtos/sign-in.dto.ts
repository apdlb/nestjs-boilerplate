import { IsEmail } from 'class-validator';

import { SignInInput } from '@/graphql';

export class SignInDto extends SignInInput {
  @IsEmail()
  email: string;
}
