import { Field, InputType } from '@nestjs/graphql';

import { CreateUserInput } from '@/graphql';

@InputType()
export class CreateUserDto implements CreateUserInput {
  @Field(() => String, { description: "User's email" })
  email: string;

  @Field(() => String, { description: "User's password" })
  password: string;

  @Field(() => String, { description: "User's first name" })
  firstName: string;
}
