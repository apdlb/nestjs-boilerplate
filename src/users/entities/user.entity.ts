import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID, { description: "User's unique identifier" })
  id: number;

  @Field(() => String, { description: "User's email" })
  email: string;

  @Field(() => String, { description: "User's name" })
  name: string;
}
