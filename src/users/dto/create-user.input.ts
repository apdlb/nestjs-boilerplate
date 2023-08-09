import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: "User's email" })
  email: string;

  @Field(() => String, { description: "User's password" })
  password: string;

  @Field(() => String, { description: "User's first name" })
  firstName: string;
}
