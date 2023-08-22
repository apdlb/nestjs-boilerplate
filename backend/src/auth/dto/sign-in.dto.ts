import { Field, InputType } from '@nestjs/graphql';

import { SignInInput } from '@/graphql';

@InputType()
export class SignInDto implements SignInInput {
  @Field(() => String, { description: "User's email" })
  email: string;

  @Field(() => String, { description: "User's password" })
  password: string;
}
