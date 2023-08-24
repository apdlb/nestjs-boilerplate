import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { Public } from '@/common/decorators';
import { GraphQLContext } from '@/common/types';
import { AuthType } from '@/graphql';

import { AuthService } from './auth.service';
import { SignInDto } from './dtos';

@Resolver(() => AuthType)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthType)
  @Public()
  async signIn(
    @Context() ctx: GraphQLContext,
    @Args('input') signInDto: SignInDto,
  ) {
    const auth = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    ctx.res.cookie('accessToken', auth.accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return auth;
  }
}
