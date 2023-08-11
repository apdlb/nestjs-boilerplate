import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';

import { Public } from '@/common/decorators';
import { GraphQLContext } from '@/common/types';

import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { Auth } from './entities';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  @Public()
  async signIn(
    @Context() ctx: GraphQLContext,
    @Args('input') signInDto: SignInDto,
  ) {
    const auth = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    ctx.res.cookie('accessToken', auth.accessToken, { httpOnly: true });

    return auth;
  }
}
