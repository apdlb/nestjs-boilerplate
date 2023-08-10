import { Field, ID, InputType } from '@nestjs/graphql';

import { UpdateUserInput } from '@/graphql';

@InputType()
export class UpdateUserDto implements UpdateUserInput {
  @Field(() => ID)
  id: string;

  @Field(() => String, { description: "User's first name" })
  firstName: string;
}
