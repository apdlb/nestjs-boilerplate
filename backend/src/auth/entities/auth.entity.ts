import { Field, ObjectType } from '@nestjs/graphql';

import { AuthType } from '@/graphql';

@ObjectType()
export class Auth implements AuthType {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String)
  accessToken: string;
}
