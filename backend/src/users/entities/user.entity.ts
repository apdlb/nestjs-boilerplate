import { Field, ID, ObjectType } from '@nestjs/graphql';

import { UserType } from '@/graphql';

@ObjectType()
export class User implements UserType {
  @Field(() => ID, { description: "User's unique identifier" })
  id: string;

  @Field(() => String, { description: "User's email" })
  email: string;

  @Field(() => String, { description: "User's first name" })
  firstName: string;

  @Field(() => String, { description: "User's last name" })
  lastName: string;
}
