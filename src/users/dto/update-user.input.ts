import { Field, ID, InputType, PartialType } from '@nestjs/graphql';

import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  id: string;

  @Field(() => String, { description: "User's first name" })
  firstName: string;
}
