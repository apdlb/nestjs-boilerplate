import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  @Field(() => String, { description: "User's email" })
  email: string;

  @Field(() => String, { description: "User's password" })
  password: string;
}
